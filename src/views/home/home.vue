<template>
    <div class="homeVue">
        <el-container>
            <el-header>
                <div class="systemTitle">
                    <img src="@/assets/images/logo2.0b7e9208.png" alt="logo" @click="toHome()">
                    <div class="theme">数据分析.管理系统</div>
                </div>
                <el-popconfirm title="这是一段内容确定删除吗？" @confirm="logout()">
                    <el-button type="danger" slot="reference">退出登录</el-button>
                </el-popconfirm>
            </el-header>
            <el-container class="homeContent">
                <el-aside :width="width">
                    <div class="folder" @click="folder()">
                            <i class="el-icon-d-arrow-right" v-show="iscollapse"></i>
                            <i class="el-icon-d-arrow-left" v-show="!iscollapse"></i>
                    </div>
                    <el-menu    background-color= '#304156'
                                text-color='rgba(255,255,255,0.6)'
                                active-text-color="#ffd04b"
                                :collapse="iscollapse"
                                :collapse-transition = istranslation
                                router
                                :default-active="$route.path" >

                        <el-menu-item index = "/potential">
                            <i class="el-icon-coin"></i>
                            <span slot="title">意向客户</span>
                        </el-menu-item>
                        <el-menu-item index = "/add">
                             <i class="el-icon-user"></i>
                            <span slot="title">添加客户</span>
                        </el-menu-item>
                        <el-menu-item index = "/dataParse">
                             <i class="el-icon-data-line"></i>
                            <span slot="title">数据分析</span>
                        </el-menu-item>
                    </el-menu>

                </el-aside>
                <el-main class="homeMain">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
  data () {
    return {
      iscollapse: false,
      width: '150px',
      istranslation: false
    }
  },
  components: {

  },
  methods: {

    // 折叠
    folder () {
      this.iscollapse = !this.iscollapse
      this.width = this.iscollapse ? '63px' : '150px'
    },

    // 退出登录
    logout () {
      window.sessionStorage.removeItem('token')
      this.$router.push('/')
      this.$message.success('退出成功')
    },
    // 返回首页
    toHome () {
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="less" scoped>
    .homeVue{
        height: 100%;

    }
    .el-container{
            height:100%;

    }
    .el-header {
        background-color: #17253F;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .systemTitle{
            display: flex;
            align-items: center;
            .theme{
                color: rgba(255,255,255,.6);
                font-size: 22px;
                padding-left: 30px;
            }
        }
        .getOut{
            display: block;
            background-color: #fff;
        }
    }
    .el-aside{
        background-color: #304156;
        height: 100%;
        position: relative;

        .folder{
               width: 30px;
            //    height: 60px;
               background-color: #fff;
               position: absolute;
               top: calc(50% - 30px);
               right: 0;
               border-radius: 5px;
               background-color:#17253F;
               color: #fff;
               line-height: 60px;
               text-align: center;
           }
    }
    .el-main{
        background-color: #fff;
    }
    .homeContent {
        height: calc(100% - 60px);
        .homeMain{
            padding: 5px;
            background: #F8F8F8;
        }
    }

</style>
