<script setup>
import { ref } from 'vue'
import { apartmentRating } from '../services/apiApartments'
const emits = defineEmits(['update:isVote'])
const props = defineProps({
  //   rating: {
  //     type: Number,
  //     default: 0
  //   },
  isVote: Boolean,
  id: String,
  starLimit: {
    type: Number,
    default: 5
  }
})

const rating = ref(0)
const currentRating = ref(0)

const onClickRating = async (index) => {
  rating.value = index

  const sds = await apartmentRating(props.id, index)
  emits('update:isVote', true)
  console.log(sds)
}

const onHoverRating = (index) => {
  console.log(index)
  currentRating.value = index
}
</script>
<template lang="">
  <div class="star-rating">
    <svg
      class="icon"
      v-for="index in starLimit"
      :key="index"
      @click="onClickRating(index)"
      @mouseover="onHoverRating(index)"
      :class="{ 'active-rating': index <= currentRating }"
    >
      <use xlink:href="@/assets/svg/sprite.svg#icon-star"></use>
    </svg>
    <div class="star-rating__colored">
      <svg class="icon active-rating" v-for="index in rating" :key="index">
        <use xlink:href="@/assets/svg/sprite.svg#icon-star"></use>
      </svg>
    </div>
  </div>
</template>

<style scoped lang="scss">
.star-rating {
  position: relative;
  display: inline-flex;

  &__colored {
    display: inline-flex;
    position: absolute;
    z-index: 999;
    width: 20;
    overflow: hidden;
  }
}
.icon {
  width: 18px;
  height: 18px;
  stroke: $activeColor;
  fill: $background;
  cursor: pointer;
}

.active-rating {
  fill: $activeColor;
}
</style>
