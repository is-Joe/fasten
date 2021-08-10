import Vue from 'vue'
import Router from 'vue-router'
import { publicRoute, protectedRoute } from './config'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store/index.js'

const routes = publicRoute.concat(protectedRoute)
// const routes = publicRoute

Vue.use(Router)
const router = new Router({
  mode: 'hash',
  linkActiveClass: 'active',
  routes: routes,
})

// router guards
// router.beforeEach((to, from, next) => {
//   NProgress.start();
//   next();

//   const token = store.getters.getAccessToken
//   if (to.path !== '/auth/login') {
//     if (token) {
//       next()
//     } else {
//       next({path: '/auth/login'}) 
//       // next();
//     }
//     // next();
//   }else {
//     next();
//   }

//   // auth route is authenticated
// })

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.path == '/auth/login') {
    return next()
  }
  const token = store.getters.getAccessToken
  if (!token) {
    next({ path: '/auth/login' })
   
  }
  // console.log(token)
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
