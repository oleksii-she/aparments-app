<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores'
import { convertPhoneNumber } from '../../../utils/formatPhoneNumber'

import { charLimit, emailValidation, passwordValidation } from '@/utils/validation'

const authStore = useAuthStore()
const router = useRouter()
const registrationState = reactive({
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: ''
})

const isValid = ref(false)
const loading = ref(false)

const errorMessageState = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const validators = [
  { name: 'name', validator: (val) => charLimit(val, 3, 10) },
  { name: 'email', validator: emailValidation },
  { name: 'password', validator: passwordValidation },
  { name: 'confirmPassword', validator: passwordValidation }
]
const isValides = ref(false)
watch(registrationState, () => {
  let valid = true // initialize to true

  for (let validator of validators) {
    const field = validator.name
    const validation = validator.validator(registrationState[field])

    if (registrationState[field]) {
      if (!validation.hasPassed) {
        errorMessageState[field] = validation.message
        valid = false // set to false only if a field fails validation
      } else {
        errorMessageState[field] = ''
      }
    }
  }

  if (registrationState.confirmPassword) {
    if (registrationState.password !== registrationState.confirmPassword) {
      errorMessageState.password = 'Паролі не співпадають'
      errorMessageState.confirmPassword = 'Паролі не співпадають'
      valid = false
    } else {
      errorMessageState.password = ''
      errorMessageState.confirmPassword = ''
    }
  }

  isValides.value = valid // set isValides directly instead of returning it
})
const onSubmit = async () => {
  const phone = convertPhoneNumber(registrationState.phone)
  const formData = {
    name: registrationState.name,
    email: registrationState.email,
    phone: phone,
    password: registrationState.password
  }

  // Перевірка довжини імені

  // Перевірка співпадіння пароля та підтвердження пароля

  if (!formData.name || !formData.email || !formData.password || !formData.phone) {
    return console.log('Всі поля повинні бути заповненні')
  }

  try {
    if (isValid.value) {
      loading.value = true
      await authStore.register(formData)
      loading.value = false
      router.push({ name: 'home' })
    } else {
      return console.log('Всі поля повинні бути заповненні')
    }
  } catch (error) {
    if (authStore.statusError) {
      console.log(authStore.statusError)
      return
    }
  }
}
</script>

<template lang="">
  <form class="form__auth" @submit.prevent.stop="onSubmit">
    <h2 class="form__title">Реєстрація</h2>
    <ULoader :loading="loading" />
    <UInput
      class="input_margin"
      v-model="registrationState.name"
      placeholder="Name"
      type="text"
      :errorMessage="errorMessageState.name"
      @update:isValid="isValid = $event"
    >
    </UInput>
    <UInput
      class="input_margin"
      v-model="registrationState.email"
      placeholder="Email"
      type="email"
      :errorMessage="errorMessageState.email"
      @update:isValid="isValid = $event"
    ></UInput>
    <UInput
      class="input_margin"
      v-model="registrationState.phone"
      placeholder="Phone"
      type="tel"
      @update:isValid="isValid = $event"
    ></UInput>
    <UInput
      class="input_margin"
      v-model="registrationState.password"
      placeholder="Password"
      type="password"
      :errorMessage="errorMessageState.password"
    >
    </UInput>
    <UInput
      class="input_margin"
      v-model="registrationState.confirmPassword"
      placeholder="Confirm password"
      type="password"
      :errorMessage="errorMessageState.confirmPassword"
    >
    </UInput>
    <UButton>Зареєструвати</UButton>
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
  margin-bottom: 15px;

  &:nth-child(6) {
    margin-bottom: 69px;
  }
}
</style>
