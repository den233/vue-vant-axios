import _import from './_import';
// 我的
export default [
  {
    path: '/',
    component: _import('layout/index'),
    children: [
      {
        path: '/mine',
        name: 'Mine',
        component: _import('mine'),
        meta: {
          title: '我的'
        },
        children: [
          {
            path: 'entry',
            name: 'mineEntry',
            component: _import('mine/entry'),
            meta: {
              title: '我的'
            }
          }
        ]
      }
    ]
  }
 
];
