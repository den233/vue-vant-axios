import _import from './_import';
// 首页
export default [
  {
    path: '/',
    component: _import('layout/indexNoMenu'),
    children: [
      {
        path: '/login',
        meta: {
          title: '登录'
        },
        component: _import('login'),
        children: [
          {
            path: 'index',
            meta: {
              title: '登录'
            },
            component: _import('login/entry')
            
          },
          {
            path: 'register',
            meta: {
              title: '注册'
            },
            component: _import('login/register')
            
          }
        ]
      }
    ]
  }
];
