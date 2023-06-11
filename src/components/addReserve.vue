<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { reactive, ref } from 'vue'
import { useUserStore } from '@/stores'
import { convertPhoneNumber } from '../utils/formatPhoneNumber'

const props = defineProps({
  id: {
    type: String
  },
  hideReserve: {
    type: Function,
    default: () => {}
  }
})
const userStore = useUserStore()
const data = reactive({
  name: '',
  phone: '',
  email: '',
  description: ''
})

const thankToggle = ref(false)

const onSubmit = async () => {
  try {
    const phone = convertPhoneNumber(data.phone)

    const newReserve = {
      name: data.name,
      email: data.email,
      description: data.description,
      phone
    }

    if (newReserve.name === '' || newReserve.email === '' || newReserve.phone.length < 10) {
      return 
    }
    await userStore.fetchAddReserve(props.id, newReserve)

    thankToggle.value = true
    setTimeout(() => {
      props.hideReserve()
    }, 1500)
  } catch (error) {
    console.log(error.message)
  }
}
</script>
<template>
  <div class="reserve">
    <h2 class="reserve__title">Reserve</h2>
    <form action="" class="reserve__form" v-if="!thankToggle" @submit.prevent.stop="onSubmit">
      <UInput type="text" v-model="data.name">
        <p style="margin-bottom: 2px">Your name</p>
      </UInput>
      <UInput type="tel" v-model="data.phone">
        <p style="margin-bottom: 2px">Your phone number</p>
      </UInput>

      <UInput type="email" v-model="data.email">
        <p style="margin-bottom: 2px">Your email</p>
      </UInput>
      <UInput
        :required="false"
        :isValid="true"
        placeholder="Maybe you have a question that you would like to ask the owner?"
        type="textarea"
        v-model="data.description"
      />
      <UButton type="submit" style="margin: 0 auto">Reserve</UButton>
    </form>
    <h2 v-else>Thank you, we will contact you!</h2>
  </div>
</template>

<style scoped lang="scss">
.reserve {
  padding: 20px;
  margin: 0 auto;
  &__title {
    text-align: center;
    margin-bottom: 15px;
  }

  &__form {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }
}
</style>
