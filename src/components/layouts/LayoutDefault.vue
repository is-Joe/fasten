<template>
  <v-app id="inspire" class="app dashboard">
    <app-drawer class="app--drawer" :show-drawer="showDrawer" />
    <app-toolbar class="app--toolbar" @side-icon-click="handleDrawerVisiable" />
    <v-main> 
      <!-- Page Header -->
        <div class="page-wrapper">
            <router-view />
        </div>
      <!-- App Footer -->
      <v-footer height="auto" class="pa-3 app--footer">
        <span>法智达(北京)科技有限公司 &copy; {{ new Date().getFullYear() }}</span>
        <v-spacer />
      </v-footer>
    </v-main>
    <!-- Go to top -->
    <app-fab />
  </v-app>
</template>

<script>
import AppDrawer from '@/components/AppDrawer'
import AppToolbar from '@/components/AppToolbar'
import AppFab from '@/components/AppFab'

export default {
  name: 'LayoutDefault',
  components: {
    AppDrawer,
    AppToolbar,
    AppFab
  },

  data() {
    return {
      showDrawer: true
    }
  },
  methods: {
    handleDrawerVisiable() {
      this.showDrawer = !this.showDrawer
    }
  },
  created() {}
}
</script>

<style lang="sass" scoped>
.page-wrapper
  min-height: calc(100vh - 64px - 50px - 81px)

.h
  width: 100px
  height: 100px
  background: red
  position: absolute
  index: 5
  

</style>
