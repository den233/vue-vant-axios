import React, { Component } from 'react'
import api from './api/api'
import 'antd/dist/antd.css';
import {message, Select, Form, Card,  Input, Col, InputNumber, Tabs, Radio, Button,Spin } from 'antd'
import styles from './App.scss'
const TabPane = Tabs.TabPane;
const { Meta } = Card;
const { Option } = Select;
const InputGroup = Input.Group;
 
// function hasErrors(fieldsError) {
// 	return Object.keys(fieldsError).some(field => fieldsError[field]);
// }

class HorizontalLoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			productName: '',
			orderType: '',
			minPrice: '',
			maxPrice: '',
			minPv: '',
			maxPv: '',
		};
	}
	componentDidMount() {
		// To disabled submit button at the beginning.
		//this.props.form.validateFields();
	}

	handleSubmit = (e) => {
		e.preventDefault();
		// const {productName,orderType,minPrice,maxPrice,minPv,maxPv} =this.state;
		let params= Object.assign({},this.state);
	  delete params['minPrice'];
		delete params['maxPrice'];
		delete params['minPv'];
		delete params['maxPv'];
		 console.log(params);
		// console.log(this.state)
		this.props.callback(params)
		// this.props.form.validateFields((err, values) => {
		// 	if (!err) {
		// 		console.log('Received values of form: ', values);
		// 	}
		// });
	}
	handleChange(e) {
		this.setState({productName: e.target.value},()=>{
			console.log(this.state.productName);//该是啥就是是啥
		});
		// console.log(this.state)
	}
	handleProduct(type,e){
	   const value=e.target.value
	   switch (type){
		   case 'productName':
		   this.props.callbackProduct('productName',value)
		   break;
		   case 'minPrice':
		   this.props.callbackProduct('minPrice',value)
		   break;
		   case 'maxPrice':
		   
		   break;
		   case 'minPv':
		   
		   break;
		   case 'maxPv':
		   
		   break;
	   }
	}
	ChangeOrdertype(e,type){
		console.log(type)
		this.setState({
			orderType:e
		})
	}
	 
	render() {
		// Only show error after a field is touched.
		// const cb = (msg) => {
		// 	const { productName, orderType, minPrice, maxPrice, minPv, maxPv } = this.state
		// 	// console.log(this.state)
		// 	return () => {
		// 		this.props.callback(msg)
		// 	}
		// }
		return (
			<div>
				<Form layout="inline" onSubmit={this.handleSubmit}>
					<Form.Item >
							<Input  onChange={this.handleProduct.bind(this,'productName')} placeholder="输入产品名" />
					</Form.Item>
					<Form.Item>
						<InputGroup compact>
							<Select defaultValue="1">
								<Option value="1">价格区间</Option>
							</Select>
							<Input onChange={this.handleProduct.bind(this,'minPrice')}  style={{ width: 100, textAlign: 'center' }} placeholder="最小价格" />
							<Input
								style={{
									width: 30, borderLeft: 0, pointerEvents: 'none', backgroundColor: '#fff',
								}}
								placeholder="~"
								disabled
							/>
							<Input onChange={this.handleProduct.bind(this,'maxPrice')}  style={{ width: 100, textAlign: 'center', borderLeft: 0 }} placeholder="最大价格" />
						</InputGroup>
					</Form.Item>
					<Form.Item>
						<InputGroup compact>
							<Select defaultValue="1">
								<Option value="1">pv区间</Option>
							</Select>
							<Input onChange={this.handleProduct.bind(this,'minPv')} style={{ width: 100, textAlign: 'center' }} placeholder="最小pv" />
							<Input
								style={{
									width: 30, borderLeft: 0, pointerEvents: 'none', backgroundColor: '#fff',
								}}
								placeholder="~"
								disabled
							/>
							<Input onChange={this.handleProduct.bind(this,'maxPv')} style={{ width: 100, textAlign: 'center', borderLeft: 0 }} placeholder="最大pv" />
						</InputGroup>
					</Form.Item>
					<Form.Item
					>
						<Select defaultValue="21" onChange={this.ChangeOrdertype.bind(this)}>
							<Option value="21">重消单</Option>
							<Option value="22">激活单</Option>
							<Option value="23">升级单</Option>
						</Select>
					</Form.Item>

					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
						// disabled={hasErrors(getFieldsError())}
						>
							搜索
          </Button>
					</Form.Item>
					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
						>
							显示全部
			      </Button>
					</Form.Item>
				</Form>

			</div>
		);
	}
}
const HorizontalLoginForm1 = Form.create()(HorizontalLoginForm);
class Lists extends Component {
	constructor(props) {
		super(props);
		this.state = {
			number:'1'
		}
		this.onChange = this.onChange.bind(this);
 
	}
	onChange(e) {
		const {index} =this.props;
		this.setState({
			number:e
		})
		var newState = {
			number: e,
			index:index
		};
		this.props.onChange(newState);
	}
	addCart(){
		const {number}=this.state;
		const {list}=this.props;
		console.log(list)
		let queryParam = {
			//"strAction": "trolley_detail_add",
			"ppsId": list['id'],
			"orderType":'21',
			"quantity": Number(number)
		}
		// return false;
	  	api.apiConfig.trolley(queryParam).then(data => {
				message.success('加入成功')
			let v1 = data.trolley_detail_add_response;
			var arr = Object.getOwnPropertyNames(v1);
			if (arr.length === 0) {
				message.error('加入失败');
				return false;
			}

			
		}).catch(e => {
			message.error(e);
		})
	}
	componentDidMount() {
		console.log(444)
		// api.categoryList().then(res=>{
		// 	console.log(res)
		// })
	}
	render() {
		const { list} = this.props
		return (
			<Col xs={24} sm={12} md={6} style={{ padding: '10px' }}>
				<Card
					hoverable
					className={styles.card}

					cover={<img alt={list.productName} style={{ height: '210px' }} src={list.imgUrl} />}
				>
					<Meta
						title={list.productName}
					/>
					<div className="price" style={{ color: ' red', padding: ' 5px 0px' }}>价格：¥{list.price}</div>
					<div className="price" style={{ color: ' red', padding: ' 5px 0px' }}>pv {list.pv}</div>
					<ul className="ant-card-actions">
						<li style={{ color: 'red', fontSize: '32', marginLeft: '10px' }}><span>
							<a>
								<InputNumber min={1} max={99} defaultValue={1} onChange={this.onChange} />
							</a></span></li>
						<li style={{ color: 'red', fontSize: '32', marginLeft: '10px' }}> <Button onClick={this.addCart.bind(this)} type="primary">加入购物车</Button></li>
					</ul>

				</Card>
			</Col>
		)
	}
}
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mode: 'top',
			a: 0,
			catArr:[],
			productName: '',
			orderType: '21',
			minPrice: '',
			maxPrice: '',
			minPv: '',
			maxPv: '',
			cartNum: '',
			serviceList:[],
			page_size:'20',
			currentPage:'1',
			categoryId:''
		};
		this.handleChildChange = this.handleChildChange.bind(this);
	}

	handleModeChange(e) {
		console.log(e)
		const mode = e.target.value;
		console.log(mode)
		this.setState({ mode:mode });
	}
	handleChildChange(comment) {
		console.log('comment',comment)
		this.setState(comment)
	}
	componentDidMount() {
		const {productName,page_size,orderType,currentPage,categoryId}= this.state;
		let querydata=  {
			productName:productName,
			category:categoryId,
			_currPageNo:currentPage,
			_pageSize:page_size,
			orderType:orderType
			}; 
		this.getCategory();
		this.getGoodsList(querydata);

	}
 
  getGoodsList(params){
		let _this=this;
		
		_this.setState({
			showLoading:true
		})
		let serviceList=[];
		let querydata=params;
			 api.apiConfig.productSale(
					 querydata
				).then(res=>{
					_this.setState({
						showLoading:false
					 })
					let	v1=res.productsale_list_response;
					var arr = Object.getOwnPropertyNames(v1);
					if(arr.length===0){
						return false;
					}
					if(v1.content.length===0){
						return false;
					}
				  serviceList=v1.content.map(v=>{
					 return {
						 id: v.id,
						 imgUrl: v.imgUrl,
						 price: v.price,
						 productName: v.productName,
						 productNo: v.productNo,
						 pv: v.pv,
						 number:1
					 }
				 });
				 _this.setState({
					serviceList:serviceList
				 })
				})
	}
	getCategory() {
		let _this=this;
		api.apiConfig.categoryList().then(res => {
			let catArr=res.productsale_category_query_response.map(v=>{
				return {
					categoryId:v.categoryId,
					categoryName:v.categoryName,
					active:false
				}
		 })
		 catArr.unshift({
			categoryId: "",
			categoryName: "全部商品"
		 })
		 _this.setState({
			 catArr: catArr
		 })
		})
	}
	onTabClick(e){
		 this.setState({
			serviceList:[]
		 })
		  const {catArr} =this.state
			let id=catArr[e].categoryId;
			this.getGoodsList(id);
	}
	callbackProduct(name,val){
      console.log(name)
	}
	//搜索
	callback(msg) {
		//const {productName,orderType}=msg;
		const {currentPage,page_size,categoryId}= this.state;
		let querydata={};
		querydata={...msg}
		querydata.currentPage=currentPage;
		querydata.page_size=page_size;
		querydata.category=categoryId;
		console.log(querydata)
		this.getGoodsList(querydata);	
		// this.setState({
		// 	productName:productName,
		// 	orderType:orderType},()=>{
		// 		this.getGoodsList("");
		// 	}
		// )
		
	}
	render() {
		const { mode,catArr,serviceList } = this.state;
		return (
			<div>
				<HorizontalLoginForm1 data={this.state} callbackProduct={this.callbackProduct.bind(this)} callback={this.callback.bind(this)} />
				<div className={styles.listcontent}>
					<Radio.Group onChange={this.handleModeChange.bind(this)} value={mode} style={{ marginBottom: 8 }}>
						<Radio.Button value="top">Horizontal</Radio.Button>
						<Radio.Button value="right">Vertical</Radio.Button>
					</Radio.Group>
					<Button type="primary">
						购物车 ({this.state.a})
          </Button>
					<Tabs
						defaultActiveKey="1"
						tabPosition={mode}
						onTabClick={this.onTabClick.bind(this)}
					>
						{catArr.map((list, i) => <TabPane tab={list.categoryName} key={i}>
						</TabPane>
						)}
					</Tabs>
					<Spin spinning={this.state.showLoading} tip="Loading...">
					{serviceList.map((list, k) =><Lists  onChange={this.handleChildChange.bind(this)} key={k} index={k} list={list} />)}
					</Spin>
				</div>
			</div>

		)
	}

}

export default App
//export default HorizontalLoginForm1;