<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores'
import { convertPhoneNumber } from '../../../utils/formatPhoneNumber'
import { createToaster } from '@meforma/vue-toaster'
import { charLimit, emailValidation, passwordValidation } from '@/utils/validation'
const toaster = createToaster({ position: 'top' })
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
const showPassword = ref(false)

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
      errorMessageState.password = 'Passwords do not match'
      errorMessageState.confirmPassword = 'Passwords do not match'
      valid = false
    } else {
      errorMessageState.password = ''
      errorMessageState.confirmPassword = ''
    }
  }

  isValides.value = valid // set isValides directly instead of returning it
})
const onSubmit = async () => {
  const NumberRegex = /^(\+|\d{2})\d{12,15}$/
  const phone = convertPhoneNumber(registrationState.phone)
  console.log(phone);
  if (!NumberRegex.test(phone)) {
      return toaster.warning(`Wrongly entered number`)
    }
  const formData = {
    name: registrationState.name,
    email: registrationState.email,
    phone: phone,
    password: registrationState.password
  }

  // Перевірка довжини імені

  // Перевірка співпадіння пароля та підтвердження пароля

  if (!formData.name || !formData.email || !formData.password || !formData.phone) {
    return  toaster.warning('All fields must be filled')
  }

  try {
    if (isValid.value) {
      loading.value = true
      await authStore.register(formData)
      loading.value = false
      router.push({ name: 'apartments' })
    } else {
      return toaster.warning('All fields must be filled')
    }
  } catch (error) {
    loading.value = false
   
    return toaster.warning(authStore.statusError)
  }
}


</script>

<template lang="">
  <form class="form__auth" @submit.prevent.stop="onSubmit">
    <h2 class="form__title">Реєстрація</h2>
    <ULoader :loading="loading" />
    <UInput
    
      v-model="registrationState.name"
      placeholder="Name"
      type="text"
      :errorMessage="errorMessageState.name"
      @update:isValid="isValid = $event"
    >
    </UInput>
    <UInput
     
      v-model="registrationState.email"
      placeholder="Email"
      type="email"
      :errorMessage="errorMessageState.email"
      @update:isValid="isValid = $event"
    ></UInput>
    <UInput
     
      v-model="registrationState.phone"
      placeholder="Phone"
      type="tel"
      @update:isValid="isValid = $event"
    ></UInput>
    <div  class='wrapper-password'>
      <UInput
     
     v-model="registrationState.password"
     placeholder="Password"
     type="password"
     :errorMessage="errorMessageState.password"
     :showPassword='showPassword'
   >
   </UInput>
   <button type='button' class='button-eyes'  @click="showPassword = !showPassword"><svg class='eyes-icon'>
          <use  xlink:href="@/assets/svg/sprite.svg#icon-eyes"></use>
        </svg></button>
    </div>

      <UInput
    v-model="registrationState.confirmPassword"
    placeholder="Confirm password"
    type="password"
    :errorMessage="errorMessageState.confirmPassword"
    :showPassword='showPassword'
  >
  </UInput>



   
<a href="https://apartments-backend.onrender.com/api/auth/google"><img src="@/assets/icon-png/google.png" alt="google-auth-link"></a>
<RouterLink :to="{name:'login'}">Enter in another way</RouterLink>
    <UButton>Зареєструвати</UButton>
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

.wrapper-password{
  position: relative;
  display: flex;
  align-items: center;
}
.button-eyes{
  position: absolute;

  top: 8px;
  outline: none;
  right: 15px;
background-color: transparent;
border: none;
  width: 30px;
  height: 30px;
cursor: pointer;




}
.eyes-icon{
  width: 32px;
  height: 32px;
stroke: $main-color;
  fill: transparent;
&:hover,&:focus{
  transition: cubic-bezier(0.165, 0.84, 0.44, 1);
 stroke: $activeColor;
}
}
</style>
