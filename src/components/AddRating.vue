<script setup>
import { ref } from 'vue'
// import { apartmentRating } from '../services/apiApartments'
const emits = defineEmits(['update:isVote'])
const props = defineProps({
  //   rating: {
  //     type: Number,
  //     default: 0
  //   },

  ratingVote: {
    type: Function,
    default: () => {}
  },
  isVote: Boolean,
  id: String,
  starLimit: {
    type: Number,
    default: 5
  },
  width: Number,
  height: Number
})

const rating = ref(0)
const currentRating = ref(0)

const onClickRating = async (index) => {
  rating.value = index
  console.log(props.id, index)
  props.ratingVote(props.id, index)
  // await apartmentRating(props.id, index)
  emits('update:isVote', true)
}

const onHoverRating = (index) => {
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
      :style="{ width, height }"
      :class="{ 'active-rating': index <= currentRating }"
    >
      <use xlink:href="@/assets/svg/sprite.svg#icon-star"></use>
    </svg>
    <div class="star-rating__colored">
      <svg
        class="icon active-rating"
        v-for="index in rating"
        :key="index"
        :style="{ width, height }"
      >
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
