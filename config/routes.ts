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
    name: 'space',
    path: '/space',
    icon: 'smile',
    routes: [
      {
        path: '/space',
        redirect: '/space/spaceDashboard',
      },
      {
        name: 'spaceDashboard',
        path: '/space/spaceDashboard',
        component: './Space/SpaceDashboard',
      },
      {
        name: 'spaceDebug',
        path: '/space/spaceDebug',
        component: './Space/SpaceDebug',
      },
    ],
  },
  {
    name: 'record',
    path: '/record',
    icon: 'table',
    routes: [
      {
        path: '/record',
        redirect: '/record/faultSolveRecord',
      },
      {
        name: 'faultSolveRecord',
        path: '/record/faultSolveRecord',
        component: './Record/FaultSolveRecord',
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
    path: '/',
    redirect: '/space',
  },
  {
    component: './404',
  },
];
