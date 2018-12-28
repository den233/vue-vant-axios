import _import from './_import';
// 我的
export default [
  {
    path: '/',
    component: _import('layout/indexNoMenu'),
    children: [
      {
        path: 'account',
        name: 'account',
        component: _import('mine/account'),
        meta: { title: '转账' }
      }
      ,{
        path: 'tixian',
        name: 'tixian',
        component: _import('mine/tixian'),
        meta: { title: '奖金提现' }
      }
      ,{
        path: 'wxrecharge',
        name: 'wxrecharge',
        component: _import('mine/wxrecharge'),
        meta: { title: '微信充值' }
      }
      ,{
        path: 'team',
        name: 'team',
        component: _import('mine/team'),
        meta: { title: '我的团队' }
      }
      ,{
        path: 'wxbangding',
        name: 'wxbangding',
        component: _import('mine/wxbangding'),
        meta: { title: '微信绑定' }
      }
      ,{
        path: 'basicinfo',
        name: 'basicinfo',
        component: _import('mine/basicinfo'),
        meta: { title: '基本信息' }
      }
      ,{
        path: 'bankcard',
        name: 'bankcard',
        component: _import('mine/bankcard'),
        meta: { title: '银行卡绑定' }
      }
      ,{
        path: 'addcard',
        name: 'addcard',
        component: _import('mine/addcard'),
        meta: { title: '添加银行卡' }
      }
      ,{
        path: 'password',
        name: 'password',
        component: _import('mine/password'),
        meta: { title: '修改密码' }
      },
      {
        path: 'wuliu',
        name: 'wuliu',
        component: _import('wuliu'),
        meta: { title: '物流查询' },
        children:[
          {
            path: 'index',
            name: 'wlindex',
            component: _import('wuliu/entry'),
            meta: { title: '物流查询' }
          } 
        ]
      }
    ]
  }
];
