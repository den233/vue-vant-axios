import React, { Component } from 'react';
import { Table, Pagination, Tag } from 'antd';
import api from '@/Api/api'
import 'antd/dist/antd.css';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderNo: '',
      goodList: [],
      _currPageNo: 1,
      _pageSize: 10,
      total: 0
    };
  }
  componentDidMount() {
    this.initData()
  }
  initData() {
    const { _pageSize, _currPageNo, orderNo } = this.state;
    let querydata = {
      _pageSize: _pageSize,
      _currPageNo: _currPageNo,
      orderNo: orderNo
    }
    api.apiConfig.allTmpOrder(
      querydata
    ).then(res => {
      let v1 = res.tmporder_list_response;
      let goodList = v1.content.map(v => {
        return {
          key: v.id,
          createdTime: v.createdTime,
          createdUserCode: v.createdUserCode,
          id: v.id,
          orderNumber: v.orderNumber,
          orderType: v.orderType,
          paid: v.paid,
          totalPrice: v.totalPrice,
          totalPv: v.totalPv,
          receiverState: v.receiverState,
          receiverAddress: v.receiverAddress,
          receiverCity: v.receiverCity,
          receiverDistrict: v.receiverDistrict,
          receiverMobile: v.receiverMobile,
          receiverName: v.receiverName,
          userCode: v.userCode,
          address: v.receiverState + "," + v.receiverCity + "," + v.receiverDistrict + "," + v.receiverAddress
        }
      })
      console.log(goodList)
      this.setState({
        goodList: goodList,
        total: v1.total
      })
    })
  }
  operateHandle(e,type){
       console.log(type)
  }
  pageChange(page, pageSize) {
    this.setState({
      _currPageNo: page
    })
    this.initData()
  }
  onShowSizeChange(page, pageSize) {
    this.setState({
      _pageSize: pageSize
    })
    this.initData()
  }
  
  render() {
    const columns = [
      {
        title: '用户编号', width: 100, dataIndex: 'userCode', key: 'userCode',
      },
      {
        title: '订单编号', width: 150, dataIndex: 'orderNumber', key: 'orderNumber',
      },
      {
        title: '订单类型', dataIndex: 'orderType', key: 'orderType', width: 100,
      },
      {
        title: '是否支付', dataIndex: 'paid', key: 'paid', width: 100, render: paid => (   
          <span>
            {
              paid?
                <Tag color={'green'} key={paid}>已支付</Tag>: <Tag color={'geekblue'} key={paid}>未支付</Tag>
            }
           
          </span>
          
        )
      },
      {
        title: '总价', dataIndex: 'totalPrice', key: 'totalPrice', width: 100,
      },
      {
        title: '总积分', dataIndex: 'totalPv', key: 'totalPv', width: 100,
      },
      {
        title: '收货地址', dataIndex: 'address', key: 'address',
      },
      {
        title: '创建时间', dataIndex: 'createdTime', key: 'createdTime', width: 150,
      },
      {
        title: '操作',
        key: 'orerate',
        fixed: 'right',
        width: 100,
        render: key => (
        <div>
           <a onClick={this.operateHandle.bind(this,key,'del')}>删除</a>
           <a onClick={this.operateHandle.bind(this,key,'pay')}>支付</a>
        </div>
        )
      },
    ];
    return (
      <div className="orderList">
        <div className="table-goodList">
          <Table pagination={false} columns={columns} dataSource={this.state.goodList} scroll={{ x: 1500, y: 300 }} /> 
        </div>
      	<div className="pagination">
            <Pagination hideOnSinglePage={false} current={this.state._currPageNo} 
            showSizeChanger onChange={this.pageChange.bind(this)}
             onShowSizeChange={this.onShowSizeChange.bind(this)} 
             defaultCurrent={1} total={this.state.total} />
				</div>
      </div>

    );
  }
}

export default App