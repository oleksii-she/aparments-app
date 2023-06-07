<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores'
import { createToaster } from '@meforma/vue-toaster'

import { RouterLink } from 'vue-router'
const toaster = createToaster({ position: 'top' })

const router = useRouter()
const authStore = useAuthStore()


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
      warningState.email = 'the field must not be empty'
      isValid = false
      break
    case !emailRegex.test(registrationState.email):
      warningState.email = 'Invalid format email'
      isValid = false
      break
    default:
      warningState.email = ''
      break
  }

  // перевірка password
  switch (true) {
    case !registrationState.password:
      warningState.password = 'the field must not be empty'
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
    router.push({ name: 'apartments' })
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
    <h2 class="form__title">Login</h2>

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
 
    <a href="https://apartments-backend.onrender.com/api/auth/google"><img src="@/assets/icon-png/google.png" alt="google-auth-link"></a>
   
    <RouterLink :to="{name:'registration'}">Register in another way</RouterLink>


    <UButton>Вхід</UButton>
  </form>
</template>

<style scoped lang="scss">
.form__auth {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 25px;
}

.form__title {
  font-family: 'Montserrat';
  font-weight: 700;
  font-size: 20px;
  line-height: calc(24 / 20);
  margin-bottom: 12px;
}


.warning__text {
  color: $warning;
  position: absolute;
  bottom: -16px;
  left: 28px;
}
</style>
