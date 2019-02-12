import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from '@/store/store';
import App from '@/components/home/home'
import { AppContainer } from 'react-hot-loader'
const render = Component => {
    ReactDOM.render(
      <AppContainer>
        <Component />
      </AppContainer>,
      document.getElementById('root'),
    )
  }
  render(App)
 
 
