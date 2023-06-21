<script setup>
import { createToaster } from '@meforma/vue-toaster'
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useApiApartmentsStore } from '@/stores/useStores/useApartmentStore'
import ApartmentsMainInfo from '@/components/apartment/apartmentsMainInfo.vue'
import { apartmentRating } from '../services/apiApartments'
const route = useRoute()
const apartmentsStore = useApiApartmentsStore()

const { id } = route.params

const toaster = createToaster({ position: 'top' })

const data = ref(null)
const comments = ref(null)
// const updateRating = ref(false)
const updateRating = ref(false)

const updateReserve = async (id) => {
  try {
    const response = await apartmentsStore.updateApartmentReserved(id, { reserved: false })
    data.value = response.result
  } catch (error) {
    console.log(error.message)
  }
}

const fetchApartmentData = async () => {
  try {
    const result = await apartmentsStore.fetchApartmentsId(id)
    data.value = result.result
  } catch (error) {
    toaster.error(error.message)
  }
}

// Виконується після встановлення рейтингу
const handleRatingUpdate = async (id, newRating) => {
  // Виконуємо оновлення рейтингу на сервері
  try {
    console.log(newRating, 'newRating')
    // await apartmentsStore.updateApartmentRating(id, newRating)
    await apartmentRating(id, newRating)
    // Після успішного оновлення рейтингу оновлюємо дані апартаментів
    fetchApartmentData()
  } catch (error) {
    console.log(error.message)
  }
}

watchEffect(() => {
  // Перевіряємо, чи потрібно оновити дані апартаментів
  if (updateRating.value) {
    fetchApartmentData()
  } else {
    fetchApartmentData()
  }
})

// watchEffect(async () => {
//   if (updateRating.value) {
//     console.log(updateRating.value, 'updateRating.value')
//     const result = await apartmentsStore.fetchApartmentsId(id)

//     data.value = result.result
//   }
// })
</script>
<template lang="">
  <main>
    <section>
      <div class="container">
        <ApartmentsMainInfo
          v-if="data"
          :apartment="data"
          :updateReserve="updateReserve"
          :id="id"
          @update:updateRating="updateRating = $event"
          :handleRatingUpdate="handleRatingUpdate"
        />
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
.main-box {
  display: flex;
  __img {
    width: 320px;
  }
}
</style>
