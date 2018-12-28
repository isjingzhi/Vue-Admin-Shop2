import axios from 'axios'
import {getToken} from './auth'
// 创建 http 实例,设置基准路径并挂载到 vue 实例中
const http = axios.create({
  baseURL: "http://localhost:8888/api/private/v1/"
});
/*
  1. 加入请求拦截器根本目的是为了解决授权的API在请求头中加入toke那令牌的问题
     拦截器接收一个参数 config==>是一个配置对象;拦截器的根本就是在请求之前定制请求的问题
  2. 注意: ①因为我们要把请求的方法挂载的到全局, 也就是说当我们请求的是 login 页面的时候也需要调用 "getToken()"
  方法, 因为登录页面是没有token的;②
  尝试方法, 给一个默认的参数的时候, 因为请求的时候只会执行一次, 无法再替换参数, 所以用 axios 请求拦截器的拦截机制;③
  请求拦截机制的根本类似予 vue - router 的路由守卫;
  判断请求的是否为需要携带 token 的页面, 需要则在请求头上加入token, 不是则直接请求
*/
http.interceptors.request.use(
  function(config) {
    // 拦截器接收一个参数 config ==> 也就是当前请求的配置对象,当axios发送请求是,必须经过这个对象载发送请求==>之前请求没有发送出去
    // 判断请求的是不是登录接口,不是的话就加入请求头
    if (config.url !== "/login") {
      // 加入请求头
      config.headers["Authorization"] = getToken();
    }
    // 登录页面,直接请求
    return config;
  }, function (error) {
    // 请求失败处理
    return Promise.reject(error);
  });
/*
// Vue.js 的插件应该有一个公开方法 install。 这个方法的第一个参数是 Vue 构造器， 第二个参数是一个可选的选项对象：
// 定义插件扩展 VUE 本身

1. 定义一个对象为对象成员添加install,install是一个函数,该函数接收两个参数 (Vue,options)
*/
const httpPlugin = {}

httpPlugin.install = function (Vue, options) {
  // 2. 挂载到实例,当挂载到全局的时候,任何组件就可以使用 this.$http 来进行访问
  Vue.prototype.$http = http
}
// 3. 导出插件对象
export default httpPlugin;

// 4. 然后再入口文件加载插件生效
/*
 入口文件:main.js中
 import httpPlugin from '@/assets/js/http'
 Vue.use(httpPlugin)
*/
