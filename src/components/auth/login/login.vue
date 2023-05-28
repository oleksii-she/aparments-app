<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores'
import { createToaster } from '@meforma/vue-toaster'
import {  decodeCredential } from 'vue3-google-login'

const toaster = createToaster({ position: 'top' })

const router = useRouter()
const authStore = useAuthStore()

const callback = (response) => {
  // decodeCredential will retrive the JWT payload from the credential
  console.log(response ,'response');
  const userData = decodeCredential(response.credential)
  console.log('Handle the userData', userData)
}
const registrationState = reactive({
  email: '',
  password: ''
})

const warningState = reactive({
  name: '',
  password: '',
  email: ''
})
const loading = ref(false)
const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/

const onSubmit = async () => {
  let isValid = true

  // перевірка email
  switch (true) {
    case !registrationState.email:
      warningState.email = 'поле не має бути пустим'
      isValid = false
      break
    case !emailRegex.test(registrationState.email):
      warningState.email = 'неправильний формат пошти'
      isValid = false
      break
    default:
      warningState.email = ''
      break
  }

  // перевірка password
  switch (true) {
    case !registrationState.password:
      warningState.password = 'поле не має бути пустим'
      isValid = false
      break
    default:
      warningState.password = ''
      warningState.confirmPassword = ''
      break
  }

  if (!isValid) {
    return
  }

  const formData = {
    email: registrationState.email,
    password: registrationState.password
  }
  try {
    loading.value = true
    await authStore.login(formData)
    loading.value = false
    router.push({ name: 'home' })
  } catch (error) {
    toaster.error(error.message)
    if (authStore.statusError) {
      loading.value = false
      console.log(authStore.statusError)
      return
    }
  }
}
</script>

<template lang="">
  <ULoader :loading="loading" />
  <form class="form__auth" @submit.prevent.stop="onSubmit">
    <h2 class="form__title">Логін</h2>

    <UInput class="input_margin" v-model="registrationState.email" placeholder="Email" type="email"
      ><p class="warning__text">{{ warningState.email }}</p></UInput
    >
    <UInput
      class="input_margin"
      v-model="registrationState.password"
      placeholder="Password"
      type="password"
    >
      <p class="warning__text">{{ warningState.password }}</p>
    </UInput>
    <GoogleLogin :callback="callback" prompt auto-login/>
   

    <UButton>Вхід</UButton>
  </form>
</template>

<style scoped lang="scss">
.form__auth {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form__title {
  font-family: 'Montserrat';
  font-weight: 700;
  font-size: 20px;
  line-height: calc(24 / 20);
  margin-bottom: 12px;
}

.input_margin {
  position: relative;
  margin-bottom: 15px;

  &:nth-child(3) {
    margin-bottom: 39px;
  }
}

.warning__text {
  color: $warning;
  position: absolute;
  bottom: -16px;
  left: 28px;
}
</style>
