<template>
    <el-dialog title="修改客户数据"
    :visible="dialogTableVisible"
    @close="closeDialog"
    :close-on-click-modal="false">
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
                            <el-button style="width: 100%;" type="primary" @click="onUpdate()">确认提交</el-button>
                        </el-col>
                        <el-col :span="6">
                            <el-button type="warning" @click="reset()">重置</el-button>
                        </el-col>
                    </el-row>
                </div>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
import { classKefu, editGet, editSubmit } from '@/network/networks'
import { ruleContact } from '@/assets/js/validator'

export default {
  data () {
    return {
      dialogTableVisible: false,
      rowid: '',
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
    const userData = window.sessionStorage.getItem('userData')
    if (userData) {
      window.sessionStorage.removeItem('userData')
    }
  },
  watch: {
    rowid (val) {
      this.editGet(val)
    }
  },
  methods: {
    closeDialog () {
      this.dialogTableVisible = false
      window.sessionStorage.removeItem('userData')
    },
    // 提交修改信息
    onUpdate () {
      this.$refs.addUserData.validate((valid) => {
        if (valid) {
          editSubmit(this.ruleForm).then((ret) => {
            console.log(ret)
            this.$message.success('修改成功')
            this.dialogTableVisible = false
            this.$parent.getAllData()
          })
        }
      })
    },
    // 重置
    reset () {
      this.editGet()
    },
    // 获得信息
    editGet () {
      editGet(this.rowid).then((ret) => {
        this.$refs.addUserData.resetFields()
        // console.log(ret);
        ret.data.results.kefu = ret.data.results.kefu.split('-')
        this.ruleForm = ret.data.results
        let userData = ret.data.results
        userData = JSON.stringify(userData)
        window.sessionStorage.setItem('userData', userData)
      })
    },
    classKefuData () {
      classKefu().then((ret) => {
        //    console.log(ret.data);
        this.infoclass = ret.data.infoclass
        this.kefu = ret.data.kefu
      })
    }
  }

}
</script>

<style>

</style>
