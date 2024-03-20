<script setup>
defineProps({
  apartments: {
    type: Object,
    required: true
  }
})
</script>
<template>
  <ul class="home-page-list">
    <template v-for="apartment in apartments" :key="apartment._id">
      <slot v-bind:apartment="apartment" name="apartment"></slot>
    </template>
  </ul>
</template>

<style scoped lang="scss">
.home-page-list {
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (min-width: 768px) {
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
