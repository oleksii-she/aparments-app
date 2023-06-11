<script setup>
import {useApiApartmentsStore} from '@/stores'
const props = defineProps({
  reserves: Array,
  hideModalToggle: {
    type: Function,
    default: () => {}
  }
})
const {fetchApartmentsId} = useApiApartmentsStore()


// const visibilityChanged = (isVisible, entry)=>{
// console.log(isVisible);
// if (!isVisible) {
//   return
// }
// console.log('abc');
// }
</script>

<template>
  <div class="wrapper">

    <h2 style="text-align: center; margin-bottom: 20px">Reserved</h2>
    <ul class="reserve-list">
      <li v-for="reserve in reserves" :key="reserve._id" class="reserve-list__item">
        <div class="reserve">
          <p class="reserve__title">{{ reserve.name }}</p>
        <p v-if="reserve.apartmentName">{{reserve.apartmentName}}</p>
          <p class="reserve__description">{{ reserve.description }}</p>
        </div>
      </li>
      <slot/>
      <!-- <div v-if="reserves.length" v-observe-visibility="visibilityChanged()"> ++++++visibilityChanged++++++ </div> -->
    </ul>
    
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  width: 320px;
  padding-top: 60px;
  margin: 0 auto;
  @media screen and (min-width: 768px) {
    width: 420px;
  }
}
.reserve-list {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  width: 300px;
  max-height: 100vh;
  overflow: auto;
  margin: 0 auto;
  padding: 0;
}

.reserve {
  /* padding: 20px; */
  box-shadow: 7px 4px 14px rgba(49, 21, 4, 0.07);
  border-radius: 40px;
  &__title {
    border-bottom: 1px solid $main-color;
    margin-bottom: 12px;
  }

  &__description {
    width: 300px;

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
