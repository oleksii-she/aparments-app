import { userApartments, userReserve } from '../../services/apiUser'
import { addReserve } from '../../services/apiApartments'
import { defineStore } from 'pinia'
import { createToaster } from '@meforma/vue-toaster'

const toaster = createToaster({ position: 'top' })

export const useUserStore = defineStore({
  id: 'userStore',
  state: () => ({
    apartments: [],
    reserves: [],
    totalReservePost: [],
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
    async fetchAddReserve(id, data) {
      try {
        this.loading = true
        await addReserve(id, data)
        this.loading = false
      } catch (error) {
        this.error = error.message
        toaster.error(error.message)
      } finally {
        this.loading = false
      }
    },

    async fetchUserReserve(id, page) {
      try {
        this.loading = true
        const response = await userReserve(id, page)
        this.loading = false

        this.totalPosts = response.data.totalPosts
        this.reserves.push(...response.data.result)
     
  
      } catch (error) {
        this.error = error.message
        toaster.error(error.message)
      } finally {
        this.loading = false
      }
    }
  }
})
