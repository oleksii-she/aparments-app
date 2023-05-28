<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { appStore } from '@/stores'

const route = useRoute()
const store = appStore()

defineProps({
  isAuth: Boolean
})

const noClickToogleSidebar = () => {
  if (store.isOpen) {
    return store.toggleOpen()
  }
}
</script>
<template>
  <nav v-if="!isAuth" class="nav-menu">
    <RouterLink
      :class="{ nav__link: true, active_link: route.path === '/login' }"
      to="/login"
      @click="noClickToogleSidebar"
    >
      Вхід
    </RouterLink>
    <span style="color: #ffffff">/</span>
    <RouterLink
      :class="{ nav__link: true, active_link: route.path === '/registration' }"
      to="/registration"
      @click="noClickToogleSidebar"
    >
      Реєстрація
    </RouterLink>
  </nav>
  <nav v-else class="nav-menu">
    <RouterLink
      :class="{ nav__link: true, active_link: route.path === '/myaccount/' }"
      to="/myaccount"
      @click="noClickToogleSidebar"
    >
      Особистий кабінет
    </RouterLink>
    <span style="color: #ffffff">/</span>
    <RouterLink
      :class="{ nav__link: true, active_link: route.path === '/post-new-add' }"
      to="/post-new-add"
      @click="noClickToogleSidebar"
    >
      Дати оголошення
    </RouterLink>
  </nav>
</template>

<style scoped lang="scss">
.nav-menu {
  @media screen and (max-width: 768px) {
    padding-top: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
}
.nav__link {
  color: #ffffff;

  font-weight: 500;
  font-size: 16px;
  line-height: calc(20 / 16);
  &:hover {
    color: $activeColor;
  }

  @media screen and (max-width: 768px) {
    color: $main-color;
  }
}

.active_link {
  color: $activeColor;
}
</style>
