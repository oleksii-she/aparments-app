import { defineStore } from 'pinia'

export const appStore = defineStore({
  id: 'appStore',
  state: () => ({
    isOpen: false
  }),

  actions: {
    toggleOpen() {
      this.isOpen = !this.isOpen
    }
  }
})
