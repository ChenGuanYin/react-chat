import React from 'react';
import ReactDOM from 'react-dom';
// import {
//   createStore,
//   applyMiddleware,
//   compose
// } from 'redux';
import {createStore,applyMiddleware} from './test.redux';
// import thunk from 'redux-thunk';
import thunk from './redux-thunk';
import arrayThunk from './redux-array';
import {Provide} from './react-redux';

import App from "./App";
// import Page from './Page'
import {reduce} from './index.redux';
// import './1.redux'

const store = createStore(reduce, applyMiddleware(thunk, arrayThunk));
// ReactDOM.render( < Page / > , document.getElementById('root'));
ReactDOM.render(
  (
    <Provide store={store}>
      <App/> 
    </Provide>  
  ), document.getElementById('root'));