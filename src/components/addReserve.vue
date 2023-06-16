<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { reactive, ref, watchEffect } from 'vue'
import { useReserversStore } from '@/stores'
import { convertPhoneNumber } from '../utils/formatPhoneNumber'
import VueDatePicker from '@vuepic/vue-datepicker'
import { addDays } from 'date-fns'
import dayjs from 'dayjs'

const props = defineProps({
  id: {
    type: String
  },
  price: Number,
  longPrice: Number,
  hideReserve: {
    type: Function,
    default: () => {}
  }
})

const reserversStore = useReserversStore()
const data = reactive({
  name: '',
  phone: '',
  email: '',
  description: '',
  sum: 0,
  startDate: '',
  endDate: '',
  numberOfDays: 0
})

const thankToggle = ref(false)

const date = ref([new Date(), addDays(new Date(), 1)])

watchEffect(() => {
  let startDate = date.value[0]
  let endDate = date.value[1]

  // Віднімаємо одну дату від іншої для отримання різниці у мілісекундах
  const timeDifference = endDate.getTime() - startDate.getTime()

  // Конвертуємо різницю у мілісекундах в кількість днів
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

  if (daysDifference < 3) {
    data.sum = daysDifference * props.price
  } else {
    data.sum = daysDifference * props.longPrice
  }
  data.numberOfDays = daysDifference
  data.startDate = dayjs(startDate).format('YYYY.MM.DD')
  data.endDate = dayjs(endDate).format('YYYY.MM.DD')
})
const onSubmit = async () => {
  try {
    const phone = convertPhoneNumber(data.phone)

    const newReserve = {
      name: data.name,
      email: data.email,
      description: data.description,
      phone,
      sum: data.sum,
      startDate: data.startDate,
      endDate: data.endDate,
      numberOfDays: data.numberOfDays
    }

    if (newReserve.name === '' || newReserve.email === '' || newReserve.phone.length < 10) {
      return
    }
    await reserversStore.fetchAddReserve(props.id, newReserve)

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

      <VueDatePicker
        v-model="date"
        multi-calendars
        range
        :partial-range="false"
        :enable-time-picker="false"
        :minDate="new Date()"
      />
      <UInput
        :required="false"
        :isValid="true"
        placeholder="Maybe you have a question that you would like to ask the owner?"
        type="textarea"
        v-model="data.description"
      />
      <p>Price: {{ data.sum }}$</p>
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
