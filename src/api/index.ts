import axios from 'axios'
import { Notification } from '@/utils/composables/tools';
import router from '@/router/index'
import useUserStore from '@/store/modules/user';


const toLogin = () => {
  useUserStore().logout().then(() => {
    router.push({
      path: '/login',
      query: {
        redirect: router.currentRoute.value.path !== '/login' ? router.currentRoute.value.fullPath : undefined,
      },
    })
  })
}

const api = axios.create({
  baseURL: "/",
  timeout: 1000 * 60,
  responseType: 'json',
})
// 请求拦截器
api.interceptors.request.use(
  (request) => {
    // const userStore = useUserStore()
    /**
     * 全局拦截请求发送前提交的参数
     * 以下代码为示例，在请求头里带上 token 信息
     */
    // if (userStore.login_status() && request.headers) {
    //   request.headers.Token = userStore.token
    // }
    // 是否将 POST 请求参数进行字符串化处理
    if (request.method === 'post') {
      // request.data = qs.stringify(request.data, {
      //   arrayFormat: 'brackets',
      // })
    }
    return request
  },
)
// 响应拦截器
api.interceptors.response.use(
  (response) => {
    /**
     * 全局拦截请求发送后返回的数据，如果数据有报错则在这做全局的错误提示
     * 假设返回数据格式为：{ status: 0, massage: '', data: '' }
     * 规则是当 code 为 0 时表示请求成功
     * 请求出错时 massage 会返回错误信息
     */
    if (response.data.code === 0) {
      if(response.data.message !== "")// 有提示内容
        Notification("success", response.data.message)
      return Promise.resolve(response.data)// 返回请求正确的数据
    }
    Notification("error", response.data.message)
    return Promise.reject(response.data)
  },
  (error) => {
    let message = error.message
    if (message === 'Network Error') {
      message = '后端网络故障'
    }
    else if (message.includes('timeout')) {
      message = '接口请求超时'
    }
    else if (message.includes('Request failed with status code')) {
      message = `接口${message.substr(message.length - 3)}异常`
    }
    Notification('error',message)
    return Promise.reject(error)
  },
)

export default api
