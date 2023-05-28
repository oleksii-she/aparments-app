<!-- eslint-disable vue/multi-word-component-names -->
<script setup></script>
<template>
  <div class="header">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.header {
  background-color: $main-color;
  padding: 16px 0;
}
</style>
