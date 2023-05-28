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
    <!-- <nav class="nav-menu" v-if="!isAuth">
      <RouterLink :class="{ nav__link: true, active_link: route.path === '/login' }" to="/login">
        Вхід
      </RouterLink>

      <RouterLink
        :class="{ nav__link: true, active_link: route.path === '/registration' }"
        to="/registration"
      >
        Реєстрація
      </RouterLink>
    </nav>
    <nav class="nav-menu" v-else>
      <RouterLink
        :class="{ nav__link: true, active_link: route.path === '/myaccount/' }"
        to="/myaccount"
      >
        Особистий кабінет
      </RouterLink>

      <RouterLink
        :class="{ nav__link: true, active_link: route.path === '/post-new-add' }"
        to="/post-new-add"
        @click="store.toggleOpen"
      >
        Дати оголошення
      </RouterLink>
    </nav> -->
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
