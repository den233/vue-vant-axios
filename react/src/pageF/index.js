import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from '@/store/store';
// import App from '@/components/home/home'
import { AppContainer } from 'react-hot-loader'
import Route from '@/router/router';
const render = Component => {
  ReactDOM.render(
    //绑定redux、热加载
    <Provider store={store}>
      <AppContainer>
        <Component />
      </AppContainer>
    </Provider>,
    document.getElementById('root'),
  )
}
  render(Route)
 
 
