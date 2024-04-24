<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useRoute } from 'vue-router'
import { watchEffect, ref } from 'vue'
import UsersChat from './chat/usersChat.vue'
import { useAuthStore } from '@/stores'

const authStore = useAuthStore()

const currentPath = ref('')
const userAuth = ref(false)
watchEffect(() => {
  if (authStore.name !== '') {
    userAuth.value = true
  } else {
    userAuth.value = false
  }
})
console.log(authStore.name)
const route = useRoute()

currentPath.value = route.path
</script>
<template lang="">
  <footer class="footer">
   
    <slot></slot>
    <!-- <ConnectionManager/> -->
    <!-- <ConnectionState/> -->

      <UsersChat v-if="route.path !== '/login' && route.path !== '/registration' && userAuth " />
  
  </footer>
</template>

<style scoped lang="scss">
.footer {
  background-color: $main-color;
  // height: 30px;
}
</style>
