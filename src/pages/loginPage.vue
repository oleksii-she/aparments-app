<script setup>
// import TheWelcome from '../components/TheWelcome.vue'
import SectionAuth from '../components/auth/sectionAuth.vue'
import ContainerAuth from '../components/auth/containerAuth.vue'
import LoginForm from '../components/auth/login/login.vue'
</script>

<template>
  <main>
    <SectionAuth
      ><ContainerAuth> <LoginForm /> </ContainerAuth
    ></SectionAuth>
  </main>
</template>
<style lang="scss"></style>
