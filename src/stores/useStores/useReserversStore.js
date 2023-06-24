import { addReserve, getAllReservers, getReserversIdInfo } from '../../services/apiReserved'
import { defineStore } from 'pinia'
import { createToaster } from '@meforma/vue-toaster'

const toaster = createToaster({ position: 'top' })

export const useReserversStore = defineStore({
  id: 'reserversStore',
  state: () => ({
    reserves: [],
    reservesReserved: [],
    totalReservePost: null,
    reserveId: null,
    loading: false,
    error: ''
  }),
  actions: {
    async fetchAddReserve(id, data) {
      try {
        this.loading = true
        const response = await addReserve(id, data)
        this.loading = false
        return response
      } catch (error) {
        this.error = error.message
        toaster.error(error.message)
      } finally {
        this.loading = false
      }
    },

    async fetchGetAllReserve(page) {
      try {
        this.loading = true
        const response = await getAllReservers()
        this.loading = false
        const result = response.data.result
        this.reservesReserved = result.filter((el) => {
          if (el.reserved !== false) {
            return el
          }
        })
        this.reserves = result.filter((el) => {
          if (el.reserved === false) {
            return el
          }
        })

        let totalLength = this.reserves.length + this.reservesReserved.length

        this.totalReservePost = response.data.totalPosts
        if (this.totalReservePost !== totalLength) {
          const response = await getAllReservers(page)
          const data = response.data.result

          data.forEach((obj) => {
            if (obj.reserved === false) {
              this.reserves.push(obj)
            } else {
              this.reservesReserved.push(obj)
            }
          })
        }
      } catch (error) {
        this.error = error.message
        toaster.error(error.message)
      }
    },

    async fetchGetReserversIdInfo(id) {
      try {
        if (!id) {
          return
        }
        this.loading = true
        await getReserversIdInfo(id)
        this.loading = false
      } catch (error) {
        this.error = error.message
        toaster.error(error.message)
      } finally {
        this.loading = false
      }
    },

    reserversIdInfo(id) {
      if (!id) {
        return
      }
      const reserves = [...this.reserves, ...this.reservesReserved]
      this.reserveId = reserves.find((el) => el._id === id)
    }
  }
})
