import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export function request1 (config) {
  const instance = axios.create({
    baseURL: 'https://ku.qingnian8.com/dataApi/vueadmin',
    timeout: 5000
  })
  return instance(config)
}
export function request2 (obj) {
  const instance = axios.create({
    baseURL: 'https://ku.qingnian8.com/dataApi/vueadmin',
    timeout: 5000,
    headers: { 'X-Token': window.sessionStorage.getItem('token') }
  })
  // request 拦截器
  // 挂载请求拦截器 (相当于请求的预验证，请求到达服务器之前先验证这次请求)
  instance.interceptors.request.use(config => {
    // 为请求头添加对象，添加token验证的Authorization字段
    NProgress.start()
    config.headers['X-Token'] = window.sessionStorage.getItem('token')
    return config
  })
  instance.interceptors.response.use((response) => {
    NProgress.done()
    return response
  })
  return instance(obj)
}
