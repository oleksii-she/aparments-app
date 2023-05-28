import { defineStore } from 'pinia'
import {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  updateUser
} from '../../services/apiAuth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    name: '',
    email: '',
    phone: '',
    statusError: '',
    token: '',
    id: '',
    isAuth: false
  }),

  persist: {
    storage: localStorage,
    paths: ['token', 'isAuth', 'id']
  },

  actions: {
    async register(userData) {
      try {
        const response = await registerUser(userData)
        this.token = response.token
        this.name = response.name
        this.email = response.email
        this.isAuth = true
      } catch (error) {
        console.log(error.message)
        this.statusError = error.message
        throw new Error(error.response.data.message)
      }
    },

    async login(userData) {
      try {
        console.log('data', userData)
        const response = await loginUser(userData)
        this.token = response.token
        this.isAuth = true
      } catch (error) {
        // console.log(error.message)
        this.statusError = error.message
        throw new Error(error.response.data.message)
      }
    },

    async current() {
      try {
        if (!this.token) {
          return
        }
        const response = await getCurrentUser(this.token)

        this.name = response.name
        this.email = response.email
        this.phone = response.phone
        this.isAuth = true
        this.id = response._id
      } catch (error) {
        console.log(error.message)
        this.isAuth = false
        this.statusError = error.message

        if (error.response && typeof error.response === 'object' && error.response.data) {
          throw new Error(error.response.data.message)
        } else {
          throw new Error('An error occurred while retrieving the current user.')
        }
      }
    },

    async logout() {
      try {
        await logoutUser()
        this.id = ''
        this.name = ''
        this.email = ''
        this.token = ''
        this.isAuth = false
      } catch (error) {
        console.log(error.message)
        this.statusError = error.message

        if (error.response && typeof error.response === 'object' && error.response.data) {
          throw new Error(error.response.data.message)
        } else {
          throw new Error('An error occurred while retrieving the current user.')
        }
      }
    },
    async fetchUpdateUser(data) {
      const result = await updateUser(data)
      console.log(result)
    }
  }
})
