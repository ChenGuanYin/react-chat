import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'; // 让redux支持异步
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './container/Login/Login';
import Register from './container/Register/Register';
import BossInfo from './container/Boss/BossInfo';
import GeniusInfo from './container/Genius/GeniusInfo';
import Dashboard from './container/Dashboard/Dashboard'
import AuthRoute from './components/Auth-Route/AuthRoute';
import reducer from './reducer';
import Chat from './container/Chat/Chat';
import './config.js';
import './index.css';

// 创建store实例；用reducer做为参数
const store = createStore(reducer, compose(
  applyMiddleware(thunk), // 使用react-redux连接redux-thunk
  window.devToolsExtension ? window.devToolsExtension() : f => f // 判断redux-tolls插件是否存在。存在则返回该对象，否则返回空，
));

ReactDOM.render(
  (<Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute></AuthRoute>
        <Switch>
          <Route path='/bossinfo' component={BossInfo}></Route>
          <Route path='/geniusinfo' component={GeniusInfo}></Route>
          <Route path='/chat/:user' component={Chat}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          <Route component={Dashboard}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root')
);
