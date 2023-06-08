<script setup>
// import { ref, watch, defineEmits, defineProps, computed } from 'vue'

// const emits = defineEmits(['update:modelValue'])

defineProps(
  {
    countries: {
      type: Array,
      default: Array
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    defaultOption: {
      type: String,
      default: 'all countries'
    }
  },
  { raw: true, shallow: true }
)
</script>

<template>
  <label>
    <select
      name=""
      id=""
      v-on:change="$emit('update:modelValue', $event.target.value)"
      class="USelect"
    >
      <option :value="defaultOption">{{ defaultOption }}</option>
      <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
    </select>
  </label>
</template>

<style scoped lang="scss">
.USelect {
  background: #ffffff;
  border: 2px solid #ff662d;
  padding: 11px 20px;
  outline: none;
  cursor: pointer;
  width: 150px;
  @media screen and (min-width: 768px) {
    width: 220px;
  }
}
</style>
