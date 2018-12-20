import _import from './_import';
// 首页
export default [
  {
    path: '/',
    component: _import('layout/index'),
    children: [
      {
        path: '/cart',
        component: _import('cart'),
        children: [
          {
            path: 'activation',
            component: _import('cart/activation'),
            meta: {
              title: '激活单'
            }
          },
          {
            path: 'repeat',
            component: _import('cart/repeat'),
            meta: {
              title: '重消单'
            }
          },
          {
            path: 'upgrade',
            component: _import('cart/upgrage'),
            meta: {
              title: '升级单'
            }
          },
          {
            path: 'family',
            component: _import('cart/family'),
            meta: {
              title: '家庭健康美丽计划'
            }
          }
        ]
      },
     
    ]
  }
];
