<script setup>
import { createToaster } from '@meforma/vue-toaster'
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useApiApartmentsStore } from '@/stores/useStores/useApartmentStore'
import ApartmentsMainInfo from '@/components/apartment/apartmentsMainInfo.vue'
import { apartmentRating } from '../services/apiApartments'
import Reviews from '../components/Review/reviews.vue'
const route = useRoute()
const apartmentsStore = useApiApartmentsStore()

const { id } = route.params

const toaster = createToaster({ position: 'top' })

const data = ref(null)

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
    const {result, user} = await apartmentsStore.fetchApartmentsId(id)

    data.value = {...result,user}
  } catch (error) {
    toaster.error(error.message)
  }
}

const handleRatingUpdate = async (id, newRating) => {
  try {
    await apartmentRating(id, newRating)

    fetchApartmentData()
  } catch (error) {
    console.log(error.message)
  }
}

watchEffect(() => {
  if (updateRating.value) {
    fetchApartmentData()
  } else {
    fetchApartmentData()
  }
})
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
        >
          <Reviews :apartment="data" :handleRatingUpdate="handleRatingUpdate"
        /></ApartmentsMainInfo>
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
