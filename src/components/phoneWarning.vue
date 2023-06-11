<script setup>
import { ref } from 'vue'
import { vMask } from '@opentf/vue-input-mask'
import { useAuthStore } from '@/stores'
import { convertPhoneNumber } from '@/utils/formatPhoneNumber'
import { createToaster } from '@meforma/vue-toaster'

const emits = defineEmits(['update:value'])

const authStore = useAuthStore()
const phone = ref('')
const loading = ref(false)
const toaster = createToaster({ position: 'top' })


const createPhone = async () => {
  try {
    const NumberRegex = /^(\+|\d{2})\d{12,15}$/
    const number = convertPhoneNumber(phone.value)

    if (!NumberRegex.test(number)) {
      return toaster.warning(`Wrongly entered number`)
    }
    loading.value=true
   await authStore.fetchUpdateUser({ phone: number })
    authStore.current()
    loading.value=false
    window.document.querySelector('body').style.overflow = ''
    emits('update:value', false)

  } catch (error) {
    if (error.request.status === 400) {
      return toaster.warning(error.request.response)
    } else {
      console.log(error.message)
    }
  }
}
</script>
<template>
  <div class="phone-waning">
    <h2>Please enter your phone number</h2>
    <input
      ref="phoneInput"
      v-mask="{ mask: '+38(0##)###-##-##' }"
      class="phone"
      type="tel"
      name="phone"
      v-model="phone"
    />
    <ULoader :loading="loading"/>
    <button type="button" @click="createPhone">Confirm</button>
    <button type="button" @click="phone = '+38(0__)___-__-__'">Clear</button>
  </div>
</template>

<style scoped lang="scss">
.phone-waning {
  /* background-color: transparent;
    border: none;
    outline: none;
    width: 160px; */
    overflow: hidden;
}

</style>
