<script setup>
// import { useApiApartmentsStore } from '@/stores'
import { useRoute, useRouter } from 'vue-router'
// import ReservedInfo from '../../pages/ReservedInfo.vue'
// import { ref } from 'vue'
import dayjs from 'dayjs'

// const route = useRoute()
const router = useRouter()

const props = defineProps({
  reserves: Array,
  handlerIdGet: {
    type: Function,
    default: () => {}
  }
})

const formatDateTime = (datetime) => {
  const now = dayjs()
  const backendDateTime = dayjs(datetime)

  if (backendDateTime.isSame(now, 'day')) {
    return backendDateTime.format('HH:mm:ss')
  } else {
    return backendDateTime.format('MM.DD')
  }
}

const showReservedInfo = (id) => {
  props.handlerIdGet(id)
  router.push(`/myaccount/reserved/${id}`)
}
</script>

<template>
  <div class="wrapper">
    <ul class="reserve-list">
      <li class="reserve-list__item" v-for="reserve in reserves" :key="reserve._id">
        <div class="reserve">
          <div class="reserve__top">
            <p class="reserve__title">{{ reserve.name }}</p>
            <p>{{ formatDateTime(reserve.updatedAt) }}</p>
          </div>
          <p>{{ reserve._id }}</p>
          <p v-if="reserve.apartmentName">{{ reserve.apartmentName }}</p>
          <p class="reserve__description">{{ reserve.description }}</p>
          <button @click="showReservedInfo(reserve._id)">Show Info</button>
        </div>
      </li>
      <slot />
      <!-- <div v-if="reserves.length" v-observe-visibility="visibilityChanged()"> ++++++visibilityChanged++++++ </div> -->
    </ul>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
}

.reserve-list {
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  width: 337px;
  /* max-height: calc(100vh - 40vh); */
  overflow: auto;
  margin: 0 auto;
  padding: 0;

  @media screen and (min-width: 768px) {
    max-height: calc(100vh - 19vh);
    overflow: auto;
  }
}

.reserve {
  box-shadow: 7px 4px 14px rgba(49, 21, 4, 0.07);
  border-radius: 20px;
  padding: 20px;
  &__title {
    margin-bottom: 12px;
  }

  &__top {
    display: flex;
    justify-content: space-between;
  }

  &__description {
    width: 300px;
    margin-top: 12px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;

    font-weight: 500;
    font-size: 16px;
    line-height: calc(20 / 16);
  }
}
</style>
