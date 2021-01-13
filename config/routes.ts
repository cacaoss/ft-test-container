export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
    ],
  },
  {
    name: 'setting',
    path: '/setting',
    icon: 'setting',
    routes: [
      {
        path: '/setting',
        redirect: '/setting/userSetting',
      },
      {
        name: 'userSetting',
        path: '/setting/userSetting',
        component: './Setting/UserSetting',
      },
    ],
  },
  {
    name: 'welcome',
    path: '/welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    name: 'admin',
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',

    routes: [
      {
        path: '/admin',
        redirect: '/admin/sub-page',
      },
      {
        name: 'sub-page',
        path: '/admin/sub-page',
        icon: 'smile',
        component: './Welcome',
      },
    ],
  },
  {
    name: 'list.table-list',
    path: '/list',
    icon: 'table',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
