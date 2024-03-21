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
  align-items: center;

  @media screen and (min-width: 768px) {
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
    align-items: baseline;
    margin: 0 auto;
    gap: 20px;
    max-width: 856px;
  }

  @media screen and (min-width: 1280px) {
    max-width: none;
    justify-content: space-between;
    margin: 0;
  }
}
</style>
