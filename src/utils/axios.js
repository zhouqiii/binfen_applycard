import axios from "axios";

// 引入Loading组件和添加dom的方法
import Loading from "@/components/Loading";

import createDom from "@/utils/createDom"
// 引入判空的方法
import { notNull } from "@/utils/commonFn"
export const instance = axios.create({
    baseURL:'',//process.env.NODE_ENV === 'development'?'https://alex188.cn/AppPrj1/cgi.do?txnId=2APO200001&dns=628&gtype=9&attest=-339418059&imei=124545':'/AppPrj',
    timeout: 15000
})
let ld;
/** 添加请求拦截器 **/
instance.interceptors.request.use(config => {
    config.headers['token'] = sessionStorage.getItem('token') || ''
    ld = createDom(Loading)
    if (config.method === 'get') { // 添加时间戳参数，防止浏览器（IE）对get请求的缓存
      config.params = {
        ...config.params,
        t: new Date().getTime()
      }
    }
    return config
  }, error=> {
    // 对请求错误做些什么
    return Promise.reject(error)
  })
  /** 添加响应拦截器  **/
instance.interceptors.response.use(response => {
    //console.log(res)
    ld.hide();
    if (response.status === 200) {  
        if (notNull(response.data)) {

        }  
        return Promise.resolve(response.data)
    } else {
      return Promise.reject(response.data.message)
    }
  }, error => {
    ld.hide();
    if (error.response) {     
      return Promise.reject(error.response.data.message)
    } else {
        return Promise.reject(new Error('请求超时, 请刷新重试'))
  }
})
  /* 统一封装请求  */
export const requestAxios = ({ url = "", data = {}, params = {}, method = "post",} = {}) => {//解构赋值
    return new Promise((resolve, reject) => {
      instance({
        url,
        data,
        params,
        method,
      })
      .then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }