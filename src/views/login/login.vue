<template>
  <div class="login">
      <div class="outer">
        <div class="logo">
          <img src="@/assets/images/logo1.jpg" alt="logo">
        </div>
        <div class="form">
          <el-form :model="loginform" label-width="80px" :rules="loginRules" status-icon ref="rulesform">

            <el-form-item label="用户名" prop="username">
              <el-input v-model="loginform.username" clearable  placeholder="请输入用户名"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
              <el-input v-model="loginform.password" type="password" placeholder="请输入密码" clearable >
              </el-input>
            </el-form-item>

            <el-form-item>
              <el-button type='primary' @click="submit()">确认登陆</el-button>
              <el-button  @click="resetForm()">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
  </div>
</template>

<script>

import { loginAxios } from '@/network/networks.js'

export default {
  data () {
    return {
      loginform: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 15, message: '请输入5-15位', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {

    // 重置表单
    resetForm () {
      this.$refs.rulesform.resetFields()
    },
    submit () {
      this.$refs.rulesform.validate((boo) => {
        if (!boo) {
          this.$message.error('用户名和密码是必填的')
          return
        };

        loginAxios(this.loginform)
          .then(ret => {
            if (ret.data.code == 200) {
              window.sessionStorage.setItem('token', ret.data.token)
              this.$message.success(ret.data.txt)
              this.$router.push('/home')
            } else if (ret.data.code == '401') {
              this.$message.error(ret.data.txt)
            }
          })
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .login {
    background-color: #33C9FF;
    height: 100%;
    position: relative;
    .outer{
      background-color: #fff;
      width: 460px;
      height: 340px;
      border-radius: 8px;
      box-shadow: 0 0 9px rgba(0,0,0,0.3);
      position: absolute;
      left:0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      .logo{
        height: 120px;
        width: 120px;
        border-radius: 50%;
        overflow: hidden;
        position: absolute;
        left: calc(50% - 60px);
        top: -60px;
        box-shadow: 0 0 15px rgba(0,0,0,0.3);
        img{
          height: 100%;
          width: 100%;

        }
      }
      .form{
        font-weight: 700;
        padding: 100px 60px 0 10px;
        // border: 1px solid orange;
      }
    }
  }
</style>
