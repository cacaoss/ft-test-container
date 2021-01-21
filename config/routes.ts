﻿export default [
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
    path: '/',
    redirect: '/space',
  },
  {
    component: './404',
  },
];
