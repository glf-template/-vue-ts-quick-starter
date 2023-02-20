import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { ElMessage } from 'element-plus'

// 创建axios的实例
const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  },
  withCredentials: false, // 跨域请求时是否需要使用凭证
  timeout: 10 * 1000 // 10s,
})
// 添加请求拦截器
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (getToken()) {
      config.headers.Authorization = getToken()
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)
//添加响应拦截器
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data || {}
    /* 处理 http 错误，抛到业务代码 */
    const { code, message } = res
    if (code && code != 200) {
      ElMessage({
        message,
        type: 'error',
        showClose: true
      })
      return Promise.reject(response.data)
    }

    if (response.config.responseType == 'blob') {
      // 文件流
      return Promise.reject(res)
    }
    return Promise.reject(res.data)
  },
  (error: AxiosError) => {
    const response = error.response
    if (axios.isCancel(error)) {
      ElMessage({
        message: '请勿重复请求',
        type: 'warning',
        showClose: true
      })
    }
    if (response && response.status) {
      const message = showStatus(response.status)
      ElMessage({
        message,
        type: 'error',
        showClose: true
      })
    } else {
      const message = '请求超时或服务器异常，请检查网络或联系管理员！'
      ElMessage({
        message,
        type: 'error',
        showClose: true
      })
    }

    return Promise.reject(error)
  }
)

const getToken = () => {
  return 'token'
}
const showStatus = (status: number) => {
  let message = ''
  switch (status) {
    case 400:
      message = '请求错误(400)'
      break
    case 401:
      message = '未授权，请重新登录(401)'
      break
    case 403:
      message = '拒绝访问(403)'
      break
    case 404:
      message = '请求出错(404)'
      break
    case 408:
      message = '请求超时(408)'
      break
    case 500:
      message = '服务器错误(500)'
      break
    case 501:
      message = '服务未实现(501)'
      break
    case 502:
      message = '网络错误(502)'
      break
    case 503:
      message = '服务不可用(503)'
      break
    case 504:
      message = '网络超时(504)'
      break
    case 505:
      message = 'HTTP版本不受支持(505)'
      break
    default:
      message = `连接出错(${status})!`
  }
  return message
}

export const request = (config: AxiosRequestConfig) => {
  return axiosInstance(config)
}
