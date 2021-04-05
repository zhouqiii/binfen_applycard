import axios from "axios";

// 引入Loading组件和添加dom的方法
import Loading from "@/components/Loading";
import createDom from "@/utils/createDom"
// 引入判空的方法
import { notNull } from "@/utils/commonFn"

export const req = axios.create({
    baseURL: "",
    timeout: 15000
})
export const request = ({ url = "", data = {}, params = {}, method = "post" } = {}) => {
    return req({
        url,
        data,
        params,
        method
    })
}
// ld为存放loading组件的变量，下边要用到组件里的方法，以及创建dom时添加到组件上的方法
let ld;
req.interceptors.request.use(config => {
    // console.log(config);
    // 发送请求之前添加loading效果
    ld = createDom(Loading)
    return config
}, err => {
    console.log(err)
})
req.interceptors.response.use(res => {
    // console.log(res)
    ld.hide();
    if (res.status === 200) {
        if (notNull(res.data)) {

        }
        return res.data
    }
    return res
}, err => {
    ld.hide();
    console.log(err)
})