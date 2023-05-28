<script setup>
import { defineProps } from 'vue'
defineProps({
  apartments: {
    type: Array,
    required: true
  }
})
</script>
<template>
  <ul class="home-page__list">
    <template v-for="apartment in apartments" :key="apartment._id">
      <slot v-bind:apartment="apartment" name="apartment"></slot>
    </template>
  </ul>
</template>

<style scoped lang="scss">
.home-page__list {
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 0;
}
</style>
