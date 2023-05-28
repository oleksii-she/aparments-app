import axios from 'axios'

import { useAuthStore } from '@/stores'
const axiosInstance = axios.create({
  baseURL: 'https://apartments-backend.onrender.com/api/'
})

axiosInstance.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

export default axiosInstance
