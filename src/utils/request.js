import axios from "axios";
import { ElNotification } from "element-plus";
import { getBaseURL } from "@/utils/judgmentEnv";
import { getToken } from "@/utils/auth";

const service = axios.create({
    baseURL: getBaseURL() + "/",
    timeout: 20000
});

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 在发送请求之前做一些事情
        config.headers["token"] = getToken();
        config.headers["Content-Type"] = "application/json;charset=utf-8"
        // get请求时添加一个data参数，解决get请求无法设置content-type的问题
        if (config.method === "get") config.data = { unused: 0 }
        // 如果data不存在，则添加一个参数用来设置content-type
        if (!config.data) config.data = { unused: 0 }
        return config;
    },
    err => {
        // 做一些请求错误
        console.log(err) // for debug
        return Promise.reject(err);
    }
);

// 响应拦截器
service.interceptors.response.use(
    /**
     * 通过自定义代码确定请求状态
     * 您还可以通过HTTP状态代码来判断状态
     */
    res => {
        const { code, error } = res.data;
        switch (code) {
            case 10002:
                ElNotification.error({ title: '系统提示', message: error || "未知错误" });
                break;
            case 10006:
                ElNotification.error({ title: '系统提示', message: error || "未知错误" });
                break
            case 10007:
                ElNotification.error({ title: '系统提示', message: error || "未知错误" });
                break;
            case 10009:
                ElNotification.error({ title: '系统提示', message: error || "未知错误" });
                break;
            case 10022:
                ElNotification.error({ title: '系统提示', message: error || "未知错误" });
                break;
            case 11003:
                // MessageBox.alert(error, '系统提示', {
                //     confirmButtonText: '重新登录',
                //     type: "error"
                // }).then(() => {
                //     store.dispatch('handleLogOut').then(() => {
                //         location.reload()
                //     }).catch(() => {
                //         location.reload()
                //     })
                // })
                break
            case 10021:
                ElNotification.error({ title: '系统提示', message: error || "未知错误" });
                break;
        }
        return res
    },
    err => {
        console.log('err' + err) // for debug
        let errorInfo = err.response;
        if (!errorInfo) {
            const { status, config } = JSON.parse(JSON.stringify(err));
            errorInfo = {
                status,
                request: { responseURL: config.url }
            };
        }
        switch (errorInfo.status) {
            case 403:
                ElNotification.error({ title: '系统提示', message: '拒绝访问' });
                break;
            case 404:
                ElNotification.error({ title: '系统提示', message: '很抱歉，资源未找到!' });
                break;
            case 504:
                ElNotification.error({ title: '系统提示', message: '网络超时' });
                break;
            case 401:
                ElNotification.error({ title: '系统提示', message: '未授权，请重新登录' });
                break;
            default:
                console.log(err)
                ElNotification.error({ title: '系统提示', message: err });
                break;
        }
        return Promise.reject(err);
    }
)

export default service;