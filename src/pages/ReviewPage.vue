<script setup>
import { createToaster } from '@meforma/vue-toaster'
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useApiApartmentsStore } from '@/stores/useStores/useApartmentStore'
import ApartmentsMainInfo from '@/components/apartment/apartmentsMainInfo.vue'
const route = useRoute()
const apiStore = useApiApartmentsStore()

const { id } = route.params

const toaster = createToaster({ position: 'top' })

const data = ref(null)
const comments = ref(null)

watchEffect(async () => {
  try {
    const result = await apiStore.fetchApartmentsId(id)
    data.value = result.result
    comments.value = result.comments
  } catch (error) {
    toaster.error(error.message)
  }
})
</script>
<template lang="">
  <main>
    <section>
      <div class="container">
        <ApartmentsMainInfo v-if="data" :apartment="data" />
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
