import { defineStore } from 'pinia'
import {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  updateUser
} from '../../services/apiAuth'
import { getAllChat, getAllChatQueryPage } from '../../services/apiChat'
export const useAuthStore = defineStore('auth', {
  state: () => ({
    name: '',
    email: '',
    phone: '',
    statusError: '',
    token: '',
    id: '',
    isAuth: false,
    isJoinAuth: false,
    chatItems: []
  }),

  persist: {
    storage: localStorage,
    paths: ['isJoinAuth', 'token', 'isAuth', 'id', 'phone']
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
        const response = await loginUser(userData)
        this.token = response.token
        this.isAuth = true
      } catch (error) {
        this.statusError = error.message
        throw new Error(error.response.data.message)
      }
    },

    async current(googleToken) {
      try {
        if (googleToken) {
          this.token = googleToken
        }
        if (!this.token) {
          return
        }

        const response = await getCurrentUser(this.token)
        this.isAuth = true
        this.name = response.name
        this.email = response.email
        this.phone = response.phone
        this.id = response._id
      } catch (error) {
        this.isAuth = false
        this.token = ''
        this.email = ''
        this.phone = ''
        this.statusError = error.message

        if (error.response && typeof error.response === 'object' && error.response.data) {
          this.token = ''
          this.phone = ''
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
        this.phone = ''
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
      await updateUser(data)
    },

    async getChats() {
      if (!this.isJoinAuth) return
      try {
        const { data } = await getAllChat()

        const newData = [...data.result].sort((a, b) => a.createdAt.localeCompare(b.createdAt))

        this.chatItems = [...newData]
        this.isJoinAuth = true
        return data
      } catch (error) {
        console.error('Error fetching chats:', error)
        // Розгляньте можливість відправлення повідомлення про помилку користувачеві
      }
    },

    async getChatsPage(page) {
      if (!this.isJoinAuth) return
      try {
        if (page === 1) return
        const { data } = await getAllChatQueryPage(page)

        this.totalPost = data.totalPosts

        const newData = [...data.result].sort((a, b) => a.createdAt.localeCompare(b.createdAt))

        this.chatItems = [...newData, ...this.chatItems]
        this.isJoinAuth = true

        return data
      } catch (error) {
        console.error('Error fetching chats:', error)
        // Розгляньте можливість відправлення повідомлення про помилку користувачеві
      }
    }
  }
})
