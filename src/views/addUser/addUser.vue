<template>
    <div class="addUser">
        <el-card class="header" shadow="none">
            <i class="el-icon-s-custom"></i>
            <span>添加最新用户资料</span>
        </el-card>
        <el-card class="section" shadow="none">
            <el-row>
                <el-col :span=18>
                    <el-form ref="addUserData"
                        :model="ruleForm"
                        :rules="rules"
                        label-width="200px"
                        status-icon>
                        <el-form-item label="客户名称" prop="nickname">
                            <el-input v-model.trim="ruleForm.nickname"></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话" prop="contact">
                            <el-input v-model.trim="ruleForm.contact"></el-input>
                        </el-form-item>
                        <el-form-item label="微信" prop="weixin">
                            <el-input v-model.trim="ruleForm.weixin"></el-input>
                        </el-form-item>
                         <el-form-item label="咨询专业" prop="zhuanye">
                             <el-input v-model.trim="ruleForm.zhuanye"></el-input>
                        </el-form-item>
                        <el-form-item label="信息来源" prop="laiyuan">
                            <el-input v-model.trim="ruleForm.laiyuan"></el-input>
                        </el-form-item>
                        <el-form-item label="所在地区" prop="dizhi">
                            <el-input v-model.trim="ruleForm.dizhi"></el-input>
                        </el-form-item>
                         <el-form-item label="选择客服" prop="kefu">
                            <el-select  multiple placeholder="请选择" v-model="ruleForm.kefu">
                                <el-option :value ="item.classname" v-for="item in kefu" :key="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <div class="btn">
                                <el-row :gutter="20">
                                    <el-col :span="8">
                                        <el-button style="width: 100%;" type="primary" @click="onsubmit()">确认提交</el-button>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-button type="warning" @click="reset()">重置</el-button>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>

        </el-card>
    </div>
</template>

<script>
import { classKefu, submitData } from '@/network/networks'
import { ruleContact } from '@/assets/js/validator'
export default {
  data () {
    return {
      kefu: [],
      infoclass: [],
      ruleForm: {
        nickname: '',
        contact: '',
        weixin: '',
        laiyuan: '',
        zhuanye: '',
        dizhi: '',
        kefu: []

      },
      rules: {
        nickname: [
          { required: true, message: '请输入客户姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        laiyuan: [
          { required: true, message: '请输入来源', trigger: 'blur' }
        ],
        kefu: [
          { required: true, message: '请输入客服', trigger: 'blur' }
        ],
        zhuanye: [
          { required: true, message: '请输入咨询专业', trigger: 'blur' }
        ],
        contact: [
          { validator: ruleContact, trigger: 'blur' }
        ],
        weixin: [
          { validator: ruleContact, trigger: 'blur' }
        ]

      }
    }
  },
  mounted () {
    this.classKefuData()
    //    this.onsubmit();
  },
  methods: {
    classKefuData () {
      classKefu().then((ret) => {
        //    console.log(ret.data);
        this.infoclass = ret.data.infoclass
        this.kefu = ret.data.kefu
      })
    },
    // 重置表单
    reset () {
      this.$refs.addUserData.resetFields()
    },
    // 提交表单
    onsubmit () {
      this.$refs.addUserData.validate((valid) => {
        if (!valid) {
          return this.$message.error('请按要求正确填写')
        }
        submitData(this.ruleForm).then(() => {
          this.$message.success('发布成功')
          this.$router.push('/potential')
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
    .addUser{
        padding: 20px;
        /deep/.header{
            color:#409EFF;
            font-size: 25px;
            span{
                padding-left: 15px;
            }
        }
        /deep/.section{
            padding: 30px;
            margin: 30px 0 0 0;
        }
    }
</style>
