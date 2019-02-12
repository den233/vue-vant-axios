import 'babel-polyfill';
import 'raf/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import store from '@/store/store';
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
// ReactDOM.render(<App />, document.getElementById('root'));