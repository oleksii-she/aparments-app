import axios from 'axios'

import { useAuthStore } from '@/stores'

const url = import.meta.env.VITE_API_URL

const axiosInstance = axios.create({
  baseURL: url
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
