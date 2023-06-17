<script setup>
defineProps({
  rating: {
    type: Number,
    default: 0
  },
  starLimit: {
    type: Number,
    default: 5
  },
  width: Number,
  height: Number
})
</script>
<template lang="">
  <div class="star-rating">
    <svg class="icon" v-for="index in starLimit" :key="index" :style="{ width, height }">
      <use xlink:href="../../assets/svg/sprite.svg#icon-star"></use>
    </svg>
    <div class="star-rating__colored">
      <svg
        class="icon active-rating {"
        v-for="index in rating"
        :key="index"
        :style="{ width, height }"
      >
        <use xlink:href="../../assets/svg/sprite.svg#icon-star"></use>
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
    z-index: 20;
    width: 20;
    overflow: hidden;
  }
}
.icon {
  width: 18px;
  height: 18px;
  stroke: $activeColor;
  fill: $background;
}
.active-rating {
  fill: $activeColor;
}
</style>
