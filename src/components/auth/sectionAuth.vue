<!-- eslint-disable vue/multi-word-component-names -->
<script setup></script>
<template lang="">
  <section class="section__auth">
    <slot></slot>
  </section>
</template>

<style scoped lang="scss">
.section__auth {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: url('../../assets/images/login.jpg') no-repeat;
  background-size: cover;
  background-position: center;
  min-height: calc(100vh - 124px);

  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(15, 29, 45, 0.5);
    z-index: -1;
  }
}
</style>
