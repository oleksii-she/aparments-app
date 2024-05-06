import { reactive } from 'vue'
import { io } from 'socket.io-client'
const url = import.meta.env.VITE_API_URL_DEFAULT

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: []
})

// "undefined" means the URL will be computed from the `window.location` object
// const URL = import.meta.env.VITE_API_URL_DEFAULT === 'production' ? undefined : url

export const socket = io(url, {
  autoConnect: true
})

socket.on('connection', () => {
  state.connected = true
})

socket.on('disconnect', () => {
  state.connected = false
})

socket.on('foo', (...args) => {
  state.fooEvents.push(args)
})

socket.on('bar', (...args) => {
  state.barEvents.push(args)
})
