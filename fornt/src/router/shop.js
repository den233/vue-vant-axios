import _import from './_import';
// 首页
export default [
  {
    path: '/',
    component: _import('layout/index'),
    children: [
      {
        path: '/shop',
        component: _import('shop'),
        children: [
          {
            path: 'entry',
            component: _import('shop/entry'),
            meta: {
              title: '商城'
            }
          }
        ]
      }
    ]
  }
];
