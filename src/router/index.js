// import Vue from 'vue'
// import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

// Vue.use(VueRouter)

// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home
//   },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
// ]

// const router = new VueRouter({
//   routes
// })

// export default router

// import Vue from 'vue'
// import VueRouter from 'vue-router'
// import login from '@/views/login.vue'

// Vue.use(VueRouter)

// const routes = [
//   {
//     path:'/',
//     component: login
//   },

// ];
// const router = new VueRouter({
//   routes
// });
// export default router

import Vue from 'vue'
import VueRouter from 'vue-router'

const login = () => import('@/views/login/login.vue')
const home = () => import('@/views/home/home.vue') // 懒加载
const welcome = () => import('@/views/welcome/welcome.vue')
const addUser = () => import('@/views/addUser/addUser.vue')
const dataParse = () => import('@/views/dataParse/dataParse.vue')
const potential = () => import('@/views/potential/potential.vue')

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/home',
    component: home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: welcome
      },
      {
        path: '/add',
        component: addUser
      },
      {
        path: '/dataParse',
        component: dataParse
      },
      {
        path: '/potential',
        component: potential
      }
    ]
  }

]
const router = new VueRouter({
  routes
})

// 导航守卫
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    return next()
  }
  var token = window.sessionStorage.getItem('token')
  if (!token) {
    next({ path: '/login' })
  }
  next()
})
export default router
