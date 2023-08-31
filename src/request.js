import axios from 'axios'
import store from '@/store'
import { Loading } from 'element-ui'

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  timeout: 60000
})

axiosInstance.interceptors.request.use(
  (config) => {
    let options = {}
    if (config.loadingOptions) {
      options = config.loadingOptions
      if (!options.target) {
        options.target = '#app'
      }
      const loadingInstance = Loading.service(options)
      config.loadingInstance = loadingInstance
    }
    if (store.getters.token) {
      config.headers['Authorization'] = store.getters.token ? 'Bearer ' + store.getters.token : ''
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

export default axiosInstance
