<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useRouter } from 'vue-router'
import Header from './components/header.vue'
import Logo from './components/logo.vue'
import Footer from './components/footer.vue'
// import ReserveMessage from '@/components/reserveMessage/reserveMessage.vue'
import { useAuthStore, appStore,useUserStore } from '@/stores'
import BurgerBtn from './components/burgerBtn.vue'
import Sidebar from './components/sidebar.vue'
import NavMenu from './components/navMenu.vue'
import { useScreenSize } from './utils/useScreenSize'
import { onMounted, watchEffect } from 'vue'
// const userStore = useUserStore()
const router = useRouter()
const authStore = useAuthStore()
const store = appStore()




onMounted(() => {
  watchEffect( async() => {
    // await userStore.fetchUserReserve(authStore.id)
    if (authStore.token) {
      authStore.current()
    }
    if(!store.isOpen){
      window.document.querySelector('body').style.overflow = ''
    }
  })
})
const { isMobile } = useScreenSize()

const logout = async () => {
  try {
    await authStore.logout()
    router.push({ name: 'login' })
  } catch (error) {
    console.log(error.message)
  }
}


</script>

<template>
  <div class="app">
    <header>
      <Header>
        <div class="container">
          <div class="wrapper">
            <router-link to="/apartments"> <Logo /></router-link>
            <BurgerBtn v-if="isMobile" />
            <NavMenu v-if="!isMobile" :isAuth="authStore.isAuth" />
            <Sidebar v-if="store.isOpen" :isAuth="authStore.isAuth" />

            <button class="logout" @click="logout" v-if="authStore.isAuth">
              <svg class="icon">
                <use xlink:href="/src/assets/svg/sprite.svg#icon-logout"></use>
              </svg>
            </button>
          </div>
        </div>
      </Header>
    </header>
    <div class="content">
      <!-- <ReserveMessage v-if="userStore.totalReservePost"/> -->
      <RouterView />

    </div>

    <Footer />
  </div>
</template>

<style scoped lang="scss">
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.content {
  flex-grow: 2;
}
.logout {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.icon {
  width: 32px;
  height: 32px;
  stroke: $background;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2;
  fill: none;

  &:hover {
    stroke: $secondary-color;
    transition: cubic-bezier(0.165, 0.84, 0.44, 1);
  }
}

</style>
