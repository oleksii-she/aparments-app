<script setup>
// import TheWelcome from '../components/TheWelcome.vue'
import SectionAuth from '../components/auth/sectionAuth.vue'
import ContainerAuth from '../components/auth/containerAuth.vue'
import Registration from '../components/auth/registration/registrarion.vue'
</script>

<template>
  <main>
    <SectionAuth
      ><ContainerAuth> <Registration /> </ContainerAuth
    ></SectionAuth>
  </main>
</template>
