import UInput from './UInput.vue'
import UButton from './UButton.vue'
import ULoader from './ULoader.vue'
import USelect from './USelect.vue'
import VueInputMask from './VueInputMask.vue'
import UModal from './modal.vue'
const components = [
  { name: 'UInput', component: UInput },
  { name: 'UButton', component: UButton },
  { name: 'ULoader', component: ULoader },
  { name: 'USelect', component: USelect },
  { name: 'VueInputMask', component: VueInputMask },
  { name: 'UModal', component: UModal }
]
export default {
  install(app) {
    components.forEach(({ name, component }) => {
      app.component(name, component)
    })
  }
}
