import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import { useUserStore } from '@/store/users'
import { ElMessage } from 'element-plus'

const service = axios.create({
  delayed: true,
  baseURL: `${import.meta.env.VITE_APP_WEB_URL}/hero-ranking`,
  timeout: 10000,
  /*  paramsSerializer: {
    /!*    encode: (params) => {
      console.log(params)
      return qs.stringify(params, { arrayFormat: 'repeat' })
    }*!/
    // serialize: (params, options)
    indexes: null
  } */
} as AxiosRequestConfig)

/** ********************请求拦截器***********************/
// @ts-ignore
service.interceptors.request.use(
  async (config) => {
    const userStore = useUserStore()
    // token
    const token = userStore.userInfo.token
    token && (config.headers!.token = token)
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

/** ********************响应拦截器***********************/
service.interceptors.response.use(
  (res: any) => {
    const { data } = res
    if (data.code === 200) {
      return data
    } else {
      ElMessage.error(data.message)
      return Promise.reject(data)
    }
  },
  (error) => {
    switch (error?.response?.status) {
      case 401:
        ElMessage.error('登录失效,请重新登录')
        break
      case 403:
        break
      case 500:
        ElMessage.error(error?.response?.data?.message || '服务出错')
        break
      default:
        ElMessage.error(error?.response?.data?.message || '服务出错')
    }
    return Promise.reject(error)
  },
)

export default service
