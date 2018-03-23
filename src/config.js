import axios from 'axios';
import { Toast } from 'antd-mobile';

// 拦截请求
axios.interceptors.request.use(function (res) {
  Toast.loading('正在加载!!!', 0);
  return res;
})

// 拦截相应
axios.interceptors.response.use(function (res) {
  Toast.hide();
  return res;
})