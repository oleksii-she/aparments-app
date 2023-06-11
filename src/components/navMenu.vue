<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { watchEffect } from 'vue';
import { appStore } from '@/stores'

const route = useRoute()
const store = appStore()

defineProps({
  isAuth: Boolean
})
watchEffect(()=>{
  if (store.isOpen) {
    window.document.querySelector('body').style.overflow = 'hidden'
 
  }
 
})

const noClickToggleSidebar = () => {
  if (store.isOpen) {
    // isBodyOverflowHidden.value = true;
    return store.toggleOpen()
  }else{
    // isBodyOverflowHidden.value = false;
  }
}
</script>
<template>
  <nav v-if="!isAuth" class="nav-menu">
    <RouterLink
      :class="{ nav__link: true, active_link: route.path === '/login' }"
      to="/login"
      @click="noClickToggleSidebar"
    >
      Login
    </RouterLink>
    <span style="color: #ffffff">/</span>
    <RouterLink
      :class="{ nav__link: true, active_link: route.path === '/registration' }"
      to="/registration"
      @click="noClickToggleSidebar"
    >
      Registration
    </RouterLink>
  </nav>
  <nav v-else class="nav-menu">
    <RouterLink
      :class="{ nav__link: true, active_link: route.path === '/myaccount/' }"
      to="/myaccount"
      @click="noClickToggleSidebar"
    >
    Personal office
    </RouterLink>
    <span style="color: #ffffff">/</span>
    <RouterLink
      :class="{ nav__link: true, active_link: route.path === '/post-new-add' }"
      to="/post-new-add"
      @click="noClickToggleSidebar"
    >
      Create advertisement
    </RouterLink>
    <span style="color: #ffffff">/</span>
    <RouterLink
      :class="{ nav__link: true, active_link: route.path === '/reserved' }"
      to="/myaccount/reserved"
      @click="noClickToggleSidebar"
    >
    Reserved
    </RouterLink>
  </nav>
</template>

<style scoped lang="scss">
.nav-menu {
  @media screen and (max-width: 767px) {
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
color: $main-color;
  @media screen and (min-width: 768px) {
    color: $background;

  }
}

.active_link {
  color: $activeColor;
}
</style>
