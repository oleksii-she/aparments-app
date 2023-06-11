<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import MoonLoader from 'vue-spinner/src/MoonLoader.vue'


const props = defineProps(
  {
    color: {
      type: String,
      default: '#ff662d'
    },
    size: {
      type: String,
      default: '350px'
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  { raw: true, shallow: true }
)
// const width = '5px'
</script>

<template>
  <div class="loader">
    <moon-loader :loading="props.loading" :color="props.color" :size="props.size"></moon-loader>
  </div>
</template>

<style scoped lang="scss">
.loader {
  position: fixed;
  z-index: 999;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
