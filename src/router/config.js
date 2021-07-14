import { LayoutAuth, LayoutDefault, LayoutChat } from '@/components/layouts'

export const publicRoute = [
  // 默认路径
  {
    path: '/',
    redirect: '/auth'
  },
  {
    path: '/auth',
    component: LayoutAuth,
    meta: {
      title: 'Login'
    },

    redirect: '/auth/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        meta: {
          title: 'Login'
        },
        component: () => import('@/views/auth/Login.vue')
      },
      {
        path: 'chgpwd',
        name: 'changepassword',
        meta: {
          title: 'Change Password'
        },
        component: () => import('@/views/auth/ChangePassword.vue')
      }
    ]
  },
  {
    path: '/500',
    name: '500',
    meta: {
      title: 'Server Error'
    },
    component: () => import('@/views/error/Error.vue')
  },
  {
    path: '/404',
    name: '404',
    meta: {
      title: 'Not Found'
    },
    component: () => import('@/views/error/NotFound.vue')
  },
  {
    path: '*',
    component: () => import('@/views/error/NotFound.vue')
  }
]

export const protectedRoute = [
  {
    path: '/www',
    component: () => import('@/views/error/NotFound.vue')
  },

  {
    path: '/sss',
    component: LayoutDefault,
    meta: {
      title: '主页',
      group: 'apps',
      icon: ''
    },
    redirect: '/list',
    children: [
      {
        path: '/list',
        name: 'list',
        meta: {
          title: '项目列表',
          group: 'apps',
          icon: 'dashboard'
        },
        component: () => import('@/views/ProjectsList.vue')
      },
      {
        path: '/users',
        name: '用户管理',
        meta: {
          title: '用户管理',
          hiddenInMenu: true
        },
        component: () => import('@/views/UsersList.vue')
      },
      {
        path: '/sensors',
        name: 'sensors',
        meta: {
          title: '传感器管理',
          hiddenInMenu: true
        },
        component: () => import('@/views/SensorList.vue')
      }
    ] 
  },

  //list
  {
    path: '/dashbord',
    component: LayoutDefault,
    redirect: '/cms/table',
    meta: {
      title: 'CMS',
      icon: 'view_compact',
      group: 'cms'
    },
    children: [
      {
        path: '/cms/table',
        name: 'ListTable',
        meta: {
          title: 'CMS Table'
        },
        component: () => import('@/views/list/Table.vue')
      }
    ]
  },


  //list  主页
  {
    path: '/cms',
    component: LayoutDefault,
    redirect: '/cms/table',
    meta: {
      title: 'CMS',
      icon: 'view_compact',
      group: 'cms'
    },
    children: [
      {
        path: '/cms/table',
        name: 'ListTable',
        meta: {
          title: 'CMS Table'
        },
        component: () => import('@/views/list/Table.vue')
      }
    ]
  },

  //widgets 
  {
    path: '/widgets',
    component: LayoutDefault,
    meta: {
      title: 'Widget',
      icon: 'widgets',
      group: 'advance'
    },
    redirect: '/widgets/chart',
    children: [
      {
        path: '/widgets/chart/:id',
        name: 'ChartWidget',
        meta: {
          title: 'Chart Widget'
        },
        component: () => import('@/views/widgets/Tabs.vue')
      },
      {
        path: '/widgets/list',
        name: 'ListWidget',
        meta: {
          title: 'List Widget'
        },
        component: () => import('@/views/widgets/List.vue')
      },
      {
        path: '/widgets/social',
        name: 'SocialWidget',
        meta: {
          title: 'Social Widget'
        },
        component: () => import('@/views/widgets/Social.vue')
      },
      {
        path: '/widgets/statistic',
        name: 'StatisticWidget',
        meta: {
          title: 'Statistic Widget'
        },
        component: () => import('@/views/widgets/Statistic.vue')
      }
    ]
  },

  // chat app
  {
    path: '/chat',
    name: 'Chat',
    component: LayoutChat,
    redirect: {
      path: '/chat/messaging'
    },
    meta: {
      title: 'Chat',
      group: 'apps',
      icon: 'chat_bubble'
    },
    children: [
      {
        path: '/chat/messaging/:uuid?',
        name: 'ChatMessaging',
        props: true,
        component: () => import('@/views/chat/ChatMessaging.vue')
      },
      {
        path: '/chat/contact/:uuid?',
        meta: {
          public: true
        },
        name: 'ChatContact',
        component: () => import('@/views/chat/ChatContact.vue')
      }
    ]
  },

  //mail app
  {
    path: '/mail',
    name: 'Mail',
    component: () => import('@/components/email/Layout.vue'),
    redirect: {
      path: '/mail/all'
    },
    children: [
      {
        path: '/mail/:mailType',
        name: 'MailIndex',
        component: () => import('@/components/email/List.vue')
      },
      {
        path: '/mail/0/:uuid',
        name: 'MailDetail',
        component: () => import('@/components/email/Reply.vue')
      }
    ]
  }
]
