import {
  addApartment,
  apartments,
  apartmentsId,
  apartmentDelleteId,
  addComment,
  commentDelleteId,
  updateReserve
} from '../../services/apiApartments'
import { defineStore } from 'pinia'
import { createToaster } from '@meforma/vue-toaster'

const toaster = createToaster({ position: 'top' })

export const useApiApartmentsStore = defineStore({
  id: 'apartments',
  state: () => ({
    comments: [],
    filter: [],
    apartments: [],
    loading: false,
    error: null,
    totalPosts: null
  }),
  getters: {
    sortPrice: (state) => (price) => {
      if (price) {
        return (state.filter = state.apartments.filter((el) => el.price >= price))
      } else {
        return (state.filter = [])
      }
    }
  },
  actions: {
    async fetchApartments(page, country) {
      try {
        this.loading = true
        const response = await apartments(page, country)
        this.totalPosts = response.data.result.totalPosts
        this.apartments = response.data.result.apartments
      } catch (error) {
        this.error = error.message
        toaster.error(error.message)
      } finally {
        this.loading = false
      }
    },
    async fetchApartmentsId(id) {
      try {
        if (!id) {
          return
        }
        this.loading = true
        const response = await apartmentsId(id)
        this.comments = response.data.comments
        return response.data
      } catch (error) {
        this.error = error.message
        toaster.error(error.message)
      } finally {
        this.loading = false
      }
    },
    async fetchApartmentsDelleteId(id) {
      try {
        this.loading = true
        const response = await apartmentDelleteId(id)
        return response.data.result
      } catch (error) {
        this.error = error.message
        toaster.error(error.message)
      } finally {
        this.loading = false
      }
    },
    async addApartmentPost(formData) {
      try {
        this.loading = true
        await addApartment(formData)

        this.loading = false
      } catch (error) {
        console.log(error.message)
        toaster.error(error.message)
      }
    },

    async addCommentPost(id, formData) {
      try {
        this.loading = true
        const response = await addComment(id, formData)

        this.comments.push(response.data.comment)
        this.loading = false
      } catch (error) {
        console.log(error.message)
        toaster.error(error.message)
      }
    },
    async fetchCommentDelleteId(id) {
      try {
        this.loading = true

        await commentDelleteId(id)
      } catch (error) {
        this.error = error.message
        toaster.error(error.message)
      } finally {
        this.loading = false
      }
    },

    async updateApartmentReserved(id, formData) {
      try {
        this.loading = true
        const response = await updateReserve(id, formData)
        this.loading = false
        return response.data
        // this.apartments = this.apartments.filter((el) => el._id !== response.data.result._id)
        // this.apartments.push(response.data.result)
      } catch (error) {
        console.log(error.message)
        toaster.error(error.message)
      }
    }
  }
})
