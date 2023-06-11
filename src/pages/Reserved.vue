<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useAuthStore, useUserStore } from '@/stores'
import { ref, watchEffect } from 'vue'
import ReserveMessageList from '@/components/reserveMessage/reserveMessageList.vue'
import { useScreenSize } from '@/utils/useScreenSize'
import ULoader from '../components/global/ULoader.vue'

const userStore = useUserStore()

const authStor = useAuthStore()
const toggleModal = ref(false)
const page = ref(1)

const { isMobile } = useScreenSize()

watchEffect(async () => {
  await userStore.fetchUserReserve(authStor.id, page.value)
})

const hideModalToggle = () => {
  toggleModal.value = !toggleModal.value
}

const visibilityChanged = (isVisible) => {
  console.log(isVisible);

  if (!isVisible) {
 return
  }
  page.value +=1
 

}
</script>
<template>
  <div class="container">
   
    <div class="reserved-mobile" v-if="isMobile">
      <ULoader :loading="userStore.loading" />
      <ReserveMessageList :reserves="userStore.reserves" :hideModalToggle="hideModalToggle">
        <div v-if="userStore.reserves.length" v-observe-visibility="visibilityChanged"></div></ReserveMessageList
      >
    </div>

    <div class="reserved-wrapper" v-else>
      <!-- 
<ReserveMessageList :reserves="reserves" :hideModalToggle="hideModalToggle" 
/> -->
      <h2>oopsh</h2>
    </div>
  </div>
</template>

<style lang="scss">
/* .reserved-wrapper{

    } */
</style>
