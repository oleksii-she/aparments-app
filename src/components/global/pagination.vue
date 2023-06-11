<!-- eslint-disable vue/multi-word-component-names -->
<!-- Updated child component code -->
<script setup>
import VPagination from '@hennge/vue3-pagination'
import {  computed } from 'vue'
const emits = defineEmits(['update:value'])

const props = defineProps({
  value: {
    type: Number,
    default: 1
  },
  perPage: {
    type: Number,
    required: true
  },
  rangeSize: {
    type: Number,
    default: 1
  },
  activeColor: {
    type: String,
    default: '#DCEDFF'
  },

  totalPost: {
    type: Number,
    default: 1
  }
})

const updateHandler = (newPage) => {
  emits('update:value', newPage)
}

const totalPages = computed(() => {
  return Math.ceil(props.totalPost / props.perPage)
})
</script>

<template>
  <v-pagination
    :pages="totalPages"
    :per-page="perPage"
    :range-size="1"
    :active-color="activeColor"
    @update:value="updateHandler"
  />
</template>
