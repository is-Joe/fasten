<template>
  <div class="potential">
      <el-card class="search">
            <div class="search">
                <el-row>
                    <el-col :span="11">
                        <el-input placeholder="请输入内容" v-model="params.keyword" @keyup.enter.native="search()"></el-input>
                    </el-col>
                    <el-col :span="1">
                        <el-button plain type="primary" @click="search()">搜索</el-button>
                    </el-col>
                </el-row>

            </div>
        </el-card>
        <el-table
        :data="tableData"
        style="width: 100%"
        stripe
        border
        height="528px">
            <el-table-column
                type="index"
                label="编号"
                width="100">
            </el-table-column>
            <el-table-column
                prop="nickname"
                label="姓名"
                width="110">
            </el-table-column>
            <el-table-column
                prop="posttime"
                label="日期"
                width="200">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{timeHandle(scope.row.posttime)}}</span>
                </template>
            </el-table-column>
             <el-table-column
                prop="contact"
                label="电话">
            </el-table-column>
             <el-table-column
                prop="weixin"
                label="微信">
            </el-table-column>
             <el-table-column
                prop="zhuanye"
                label="专业">
            </el-table-column>
             <el-table-column
                prop="laiyuan"
                label="信息来源">
            </el-table-column>
             <el-table-column
                prop="dizhi"
                label="地区">
            </el-table-column>
             <el-table-column
                prop="kefu"
                label="客服">
            </el-table-column>
             <el-table-column
                prop="address"
                label="操作">
                 <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" content="修改" placement="top">
                        <el-button type="primary" icon="el-icon-edit" circle  @click="edit(scope.row.id)"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除" placement="top">
                        <el-button type="danger" icon="el-icon-delete" circle @click="delect(scope.row.id)"></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <div class="pages">
            <el-card>
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[10, 20, 30,40]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
                </el-pagination>
            </el-card>
        </div>
        <updataDialog ref="updateDialog"></updataDialog>
  </div>
</template>

<script>
import { userAll, delectData } from '@/network/networks'
import { timeHandle } from '@/assets/js/common.js'
import updataDialog from './/children/updateDialog.vue'
export default {
  components: {
    updataDialog
  },
  data () {
    return {
      tableData: ['joe'],
      total: 0,
      params: {
        num: 10,
        page: 1,
        keyword: ''
      }

    }
  },
  mounted () {
    this.getAllData()
  },
  methods: {
    getAllData () {
      userAll(this.params).then(ret => {
        this.tableData = ret.data.results
        this.total = ret.data.num
      })
    },
    timeHandle (posttime) {
      return timeHandle(posttime, 1)
    },
    // 信息检索时候
    search () {
      this.getAllData()
    },
    // 每页个数切换的时候
    handleSizeChange (e) {
      this.params.num = e
      this.getAllData()
    },
    // 页码切换的时候
    handleCurrentChange (e) {
      this.params.page = e
      this.getAllData()
    },
    // 删除数据
    delect (id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delectData(id).then(() => {
          this.getAllData()
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 编辑数据
    edit (id) {
      this.$refs.updateDialog.rowid = id
      this.$refs.updateDialog.dialogTableVisible = true
    }
  }

}

</script>

<style lang="less" scoped>
   /deep/ .el-card__body {
        padding: 10px;
    }
    .pages{
        text-align: center;
    }
</style>
