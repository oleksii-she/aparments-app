import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => {
    return {
      count: 0,
      name: 'asas'
    }
  },
  persist: {
    storage: localStorage, // data in sessionStorage is cleared when the page session ends.
    paths: ['count']
  },
  actions: {
    increment(value = 1) {
      this.count += value
    },
    decrement(value = 1) {
      this.count -= value
    },
    reset() {
      this.count = 0
    }
  },
  getters: {
    doubleCount: (state) => {
      return state.count * 2
    },
    squareCount: (state) => {
      return state.count ** 2
    }
  }
})
