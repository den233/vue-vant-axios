import _import from './_import';
export default [
  {
    path: '/',
    component: _import('layout/index'),
    children: [
      {
        path: '/order',
        name: 'Order',
        component: _import('order'),
        children: [
          {
            path: 'list',
            name: 'OrderList',
            component: _import('order/list'),
            meta: { title: '我的订单' }
          },
          {
            path: 'detail',
            name: 'OrderDetail',
            component: _import('order/detail'),
            meta: { title: '订单详情' }
          },
          {
            path: 'neworder',
            name: 'neworder',
            component: _import('order/neworder'),
            meta: { title: '激活单支付' }
          },
          {
            path: 'repeatorder',
            name: 'repeatorder',
            component: _import('order/repeatorder'),
            meta: { title: '重消单支付' }
          }
        ]
      }
    ]
  }
];
