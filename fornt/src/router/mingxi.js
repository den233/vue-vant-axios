 import _import from './_import';
// 消息
export default [
 {
    path: '/',
    component: _import('layout/indexNoMenu'),
    children: [
      {
        path: '/mingxi',
        name: 'listdetail',
        component: _import('mine/mingxi'),
        meta: {
          title: '明细'
        },
        children: [
          {
            path: 'wallet',
            name: 'mineWallet',
            component: _import('mine/wallet'),
            meta: {
              title: '我的钱包'
            }
          },
          {
            path: 'cashreport',
            name: 'cashreport',
            component: _import('mine/mingxi/cashrepport'),
            meta: {
              title: '提现记录'
            }
          },
          {
            path: 'cashdetail',
            name: 'cashdetail',
            component: _import('mine/mingxi/cashdetail'),
            meta: {
              title: '提现记录详情'
            }
          },
          {
            path: 'transport',
            name: 'transport',
            component: _import('mine/mingxi/transport'),
            meta: { title: '转账记录' },
          },
          {
            path: 'profit',
            name: 'profit',
            component: _import('mine/mingxi/profit'),
            meta: { title: '奖金明细' },
          },
          {
            path: 'xianjin',
            name: 'xianjin',
            component: _import('mine/mingxi/xianjin'),
            meta: { title: '现金明细' },
          },
          {
            path: 'coin',
            name: 'coin',
            component: _import('mine/mingxi/coin'),
            meta: { title: '电子币' },
          },
          {
            path: 'pv',
            name: 'pv',
            component: _import('mine/mingxi/pv'),
            meta: { title: '积分明细' },
          }
        ]
      }
    ]
  }
]