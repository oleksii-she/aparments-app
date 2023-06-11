<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
// import { RouterLink, useRoute } from 'vue-router'
import NavMenu from './navMenu.vue'
// import { appStore } from '@/stores'
// const store = appStore()
// const route = useRoute()
defineProps({
  isAuth: Boolean
})

// store.toggleOpen()
</script>
<template lang="">
  <div class="sidebar">
    <NavMenu :isAuth="isAuth" />
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  position: fixed;
  background-color: $background;
  top: 0;
  left: 0;
  z-index: 500;
  width: 100vw;
  height: 100vh;
  padding: 20px;
  overflow: hidden;
}

.nav-menu {
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.nav__link {
  color: $main-color;
  font-weight: 500;
  font-size: 16px;
  line-height: calc(20 / 16);
  &:hover {
    color: $activeColor;
  }
}

.active_link {
  color: $activeColor;
}
</style>
