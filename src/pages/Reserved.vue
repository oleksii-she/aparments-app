<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useReserversStore, useApiApartmentsStore } from '@/stores'
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import ReserveMessageList from '@/components/reserveMessage/reserveMessageList.vue'
import { useScreenSize } from '@/utils/useScreenSize'
import ULoader from '../components/global/ULoader.vue'
import ReserveMessageInfo from '../components/reserveMessage/reserveMessageInfo.vue'

const route = useRoute()
const { id: paramsId } = route.params
const reserversStore = useReserversStore()
const apartmentsStore = useApiApartmentsStore()
const selectedReserveId = ref(null)
const toggleModal = ref(false)
const page = ref(1)
const reserveInfo = ref(null)
const reservedListToggle = ref(false)
const { isMobile } = useScreenSize()
const reservedToggle = ref(null)

watchEffect(async () => {
  await reserversStore.fetchGetAllReserve()
  if (reserversStore.reserves.length !== reserversStore.totalReservePost) {
    await reserversStore.fetchGetAllReserve(page.value)
  }
})

watchEffect(async () => {
  let id = selectedReserveId.value
  if (!id) {
    id = paramsId
  }

  reserversStore.reserversIdInfo(id)
  // console.log('====================================')
  // console.log(reserversStore.reserveId)
  // console.log('====================================')
  // const response = await reserversStore.fetchGetReserversIdInfo(id)
  // reserveInfo.value = reserversStore.reserveId
})

const hideModalToggle = () => {
  toggleModal.value = !toggleModal.value
}

const visibilityChanged = (isVisible) => {
  if (reserversStore.reserves <= 9) {
    return
  }

  if (!isVisible) {
    return
  }

  if (reserversStore.reserves.length !== reserversStore.totalReservePost) {
    page.value = +1
  }
  console.log(isVisible)
}

const handlerIdGet = (id) => {
  selectedReserveId.value = id

  reserversStore.reserversIdInfo(paramsId)
}

const updateReserve = async (id) => {
  try {
    const response = await apartmentsStore.updateApartmentReserved(id, { reserved: true })

    reservedToggle.value = response.reserved
    await reserversStore.fetchGetAllReserve()
  } catch (error) {
    console.log(error.message)
  }
}
</script>
<template>
  <div class="container">
    <div class="reserved-wrapper reserved-mobile" v-if="isMobile">
      <h2 style="text-align: center; margin-bottom: 20px">Reserved</h2>
      <ULoader :loading="reserversStore.loading" />
      <ReserveMessageList
        :reserves="reserversStore.reserves"
        :hideModalToggle="hideModalToggle"
        :handlerId="handlerId"
      >
        <div v-if="reserversStore.reserves.length" v-observe-visibility="visibilityChanged"></div
      ></ReserveMessageList>
    </div>

    <div class="reserved-wrapper" v-else>
      <div v-if="reservedListToggle" class="reserved-box">
        <UButton style="width: 250px" @click="reservedListToggle = false">Reserved</UButton>
        <h2>In reserve</h2>
        <ReserveMessageList
          :reserves="reserversStore.reservesReserved"
          :hideModalToggle="hideModalToggle"
          :handlerIdGet="handlerIdGet"
        >
          <div
            v-if="reserversStore.reserves.length > 9"
            v-observe-visibility="visibilityChanged"
          ></div
        ></ReserveMessageList>
      </div>
      <div v-else class="reserved-box">
        <UButton style="width: 250px" @click="reservedListToggle = true">In reserve</UButton>
        <h2>Reserved</h2>
        <ReserveMessageList
          :reserves="reserversStore.reserves"
          :hideModalToggle="hideModalToggle"
          :handlerIdGet="handlerIdGet"
        >
          <div
            v-if="reserversStore.reserves.length > 9"
            v-observe-visibility="visibilityChanged"
          ></div
        ></ReserveMessageList>
      </div>

      <ULoader :loading="reserversStore.loading" />
      <div class="reserved-wrapper__info">
        <ReserveMessageInfo
          :reserveInfo="reserversStore.reserveId"
          :updateReserve="updateReserve"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.reserved-wrapper {
  display: flex;
  justify-content: space-around;

  &__info {
    width: 100%;
  }
}

.reserved-box {
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 23px;

  border-right: 3px solid rgb(216, 223, 224);
}

.reserved-mobile {
  flex-direction: column;
}
</style>
