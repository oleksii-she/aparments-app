<script setup>
import { createToaster } from '@meforma/vue-toaster'
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useApiApartmentsStore } from '@/stores/useStores/useApartmentStore'
import ApartmentsMainInfo from '@/components/apartment/apartmentsMainInfo.vue'
const route = useRoute()
const apartmentsStore = useApiApartmentsStore()

const { id } = route.params

const toaster = createToaster({ position: 'top' })

const data = ref(null)
const comments = ref(null)

watchEffect(async () => {
  try {
    const result = await apartmentsStore.fetchApartmentsId(id)
    data.value = result.result
    comments.value = result.comments
  } catch (error) {
    toaster.error(error.message)
  }
})
const updateReserve = async (id) => {
  try {
    const response = await apartmentsStore.updateApartmentReserved(id, { reserved: false })
    console.log(response.result)
    data.value = response.result
  } catch (error) {
    console.log(error.message)
  }
}
</script>
<template lang="">
  <main>
    <section>
      <div class="container">
        <ApartmentsMainInfo v-if="data" :apartment="data" :updateReserve="updateReserve" />
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
