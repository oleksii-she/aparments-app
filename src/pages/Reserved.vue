<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useReserversStore, useApiApartmentsStore } from '@/stores'
import { ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ReserveMessageList from '@/components/reserveMessage/reserveMessageList.vue'
import { useScreenSize } from '@/utils/useScreenSize'
import ULoader from '../components/global/ULoader.vue'
import ReserveMessageInfo from '../components/reserveMessage/reserveMessageInfo.vue'
import BackBtn from '../components/global/BackBtn.vue'
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
const mobToggleInfo = ref(false)
const activeIdLink = ref('')

watchEffect(async () => {
  await reserversStore.fetchGetAllReserve()
  if (reserversStore.reserves.length !== reserversStore.totalReservePost) {
    await reserversStore.fetchGetAllReserve(page.value)
  }
})
const router = useRouter()
watchEffect(async () => {
  let id = selectedReserveId.value
  if (!id) {
    id = paramsId
  }

  reserversStore.reserversIdInfo(id)

  const findId = reserversStore.reservesReserved.find((el) => el._id === paramsId)

  if (findId) {
    reservedListToggle.value = true
  }
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
}

const handlerIdGet = (id) => {
  selectedReserveId.value = id
  reserversStore.reserversIdInfo(paramsId)

  if (id) {
    mobToggleInfo.value = true
  }
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

const goBack = () => {
  mobToggleInfo.value = false
  router.push('/myaccount/reserved')
}
</script>
<template>
  <div class="container">
    <ULoader :loading="reserversStore.loading" />
    <div class="reserved-wrapper reserved-mobile" v-if="isMobile">
      <div v-if="!mobToggleInfo">
        <div v-if="reservedListToggle" class="reserved-box">
          <UButton style="width: 150px; height: 50px" @click="reservedListToggle = false"
            >Reserved</UButton
          >
          <h2 style="text-align: center; margin-bottom: 20px">In reserve</h2>
          <ReserveMessageList
            :reserves="reserversStore.reservesReserved"
            :hideModalToggle="hideModalToggle"
            :handlerIdGet="handlerIdGet"
          >
            <div
              v-if="reserversStore.reserves.length"
              v-observe-visibility="visibilityChanged"
            ></div
          ></ReserveMessageList>
        </div>
        <div v-else class="reserved-box">
          <UButton style="width: 150px; height: 50px" @click="reservedListToggle = true"
            >In reserve</UButton
          >
          <h2 style="text-align: center; margin-bottom: 20px">Reserved</h2>
          <ReserveMessageList
            :reserves="reserversStore.reserves"
            :hideModalToggle="hideModalToggle"
            :handlerIdGet="handlerIdGet"
          >
            <div
              v-if="reserversStore.reserves.length"
              v-observe-visibility="visibilityChanged"
            ></div
          ></ReserveMessageList>
        </div>
      </div>

      <div class="reserved-wrapper__info" v-else>
        <BackBtn class="button-back" @click="goBack">back</BackBtn>
        <ReserveMessageInfo
          :reserveInfo="reserversStore.reserveId"
          :updateReserve="updateReserve"
        />
      </div>
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
        <UButton style="width: 250px" @click="goBack">In reserve</UButton>
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
.button-back {
  @media screen and (max-width: 767px) {
    position: absolute;
    left: 0;
    top: 10px;
  }
}
.reserved-box {
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 23px;

  @media screen and (min-width: 768px) {
    border-right: 3px solid rgb(216, 223, 224);
    height: calc(100vh - 100px);
  }
}

.button-toggle {
  width: 150px;
  height: 50px;
}

.reserved-mobile {
  position: relative;
  flex-direction: column;
}
.reserved-wrapper__info {
  padding-top: 35px;
}
</style>
