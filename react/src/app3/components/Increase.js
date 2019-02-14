import {connect} from 'react-redux';//引入connect 用于把数据和组件进行关联
import {incraceAction} from '../redux/action.js';//引入action 和react相关组件
import React,{Component} from 'react';
// import '../css/increase.css'
class Counter extends Component{
    render(){
        const {count,incraceClick}=this.props;
        return(
            <div className='content'>
            <p className="title">加法页面</p>
            <p className="text">{count}</p>
            <button className='btn' onClick={incraceClick}>加上</button>
            </div>
        )
    }
 }
 const mapStateToProps=(state)=>({
     count:state.count
 })
 const mapDispatchToProps=(dispatch)=>({
    incraceClick:()=>dispatch(incraceAction(2)),
 })
 const Increase =connect(
    mapStateToProps,
    mapDispatchToProps
 )(Counter)
 export default Increase;