import React, { Component } from 'react';
import { Table } from 'antd';
import api from '@/Api/api'
import 'antd/dist/antd.css';
import './App.css';

const columns = [
  {
    title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left',
  },
  {
    title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left',
  },
  {
    title: 'Column 1', dataIndex: 'address', key: '1', width: 150,
  },
  {
    title: 'Column 2', dataIndex: 'address', key: '2', width: 150,
  },
  {
    title: 'Column 3', dataIndex: 'address', key: '3', width: 150,
  },
  {
    title: 'Column 4', dataIndex: 'address', key: '4', width: 150,
  },
  {
    title: 'Column 5', dataIndex: 'address', key: '5', width: 150,
  },
  {
    title: 'Column 6', dataIndex: 'address', key: '6', width: 150,
  },
  {
    title: 'Column 7', dataIndex: 'address', key: '7', width: 150,
  },
  { title: 'Column 8', dataIndex: 'address', key: '8' },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <a href="javascript:;">action</a>,
  },
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

class App extends Component {
  constructor(props) {
		super(props);
		this.state = {
       orderNo:'',
       goodList:[],
       _currPageNo:1,
       _pageSize:10
		};
  }
  componentDidMount() {
	   this.initData()
	}
  initData(){
    const {_pageSize, _currPageNo,orderNo}=this.state;
    let querydata={
      _pageSize: _pageSize,
      _currPageNo: _currPageNo,
      orderNo:orderNo
    }
    api.apiConfig.allTmpOrder(
			querydata
		).then(res => {
        console.log(res)
    })
  }
  render() {
    return (
      <Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 300  }} />
    );
  }
}

export default App