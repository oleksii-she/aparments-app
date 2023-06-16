import { userApartments} from '../../services/apiUser'
import { defineStore } from 'pinia'
import { createToaster } from '@meforma/vue-toaster'

const toaster = createToaster({ position: 'top' })

export const useUserStore = defineStore({
  id: 'userStore',
  state: () => ({
    apartments: [],
    totalPosts: null,
    loading: false,
    error: ''
  }),
  actions: {
    async fetchUserApartments(id, page) {
      try {
        this.loading = true
        const response = await userApartments(id, page)

        this.apartments = response.data.result.apartments
        this.totalPosts = response.data.result.totalPosts
      } catch (error) {
        this.error = error.message
        toaster.error(error.message)
      } finally {
        this.loading = false
      }
    },
  
  }
})
