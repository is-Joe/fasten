const Menu = [
  { header: '基础功能' },
  {
    text: '云数据监测',
    icon: "monitor",
    to: '/cms',
  },
  {
    text: '项目列表',
    icon: 'dashboard',
    to: '/list',
  },
  {
    text: '传感器管理',
    icon: 'dashboard',
    to: '/sensors',
  },
  {
    text: '用户管理',
    icon: 'dashboard',
    to: '/users',
  },

  // {
  //   text: '项目详情',
  //   icon: 'view_compact',
  //   to: '/widgets',
  // },

  // {
  //   text: '传感器管理',
  //   group: 'widgets',
  //   to: '/widgets',
  //   icon: 'widgets',
  //   children: [
  //     { to: '/widgets/social', text: '工程列表' },
  //     { to: '/widgets/statistic', text: 'Statistic', badge: 'new' },
  //     { to: '/widgets/chart', text: 'Chart' },
  //     { to: '/widgets/list', text: 'List' },
  //   ],
  // },
  // {
  //   text: '传感器管理',
  //   icon: 'chat_bubble',
  //   target: '_blank',
  //   to: '/chat',
  // },
  // {
  //   text: 'Inbox',
  //   to: '/mail',
  //   target: '_blank',
  //   icon: 'email',
  // },
  // {
  //   text: 'Media',
  //   to: '/media',
  //   icon: 'perm_media',
  // },
  // {
  //   text: 'Widgets',
  //   group: 'widgets',
  //   to: '/widgets',
  //   icon: 'widgets',
  //   children: [
  //     { to: '/widgets/social', text: 'Social' },
  //     { to: '/widgets/statistic', text: 'Statistic', badge: 'new' },
  //     { to: '/widgets/chart', text: 'Chart' },
  //     { to: '/widgets/list', text: 'List' },
  //   ],
  // },
  { header: '附加功能' },
  // {
  //   text: 'List & Query',
  //   group: 'layout',
  //   to: 'cms',
  //   icon: 'view_compact',
  //   children: [{ to: '/cms/table', text: 'Basic Table' }],
  // },
]

export default Menu
