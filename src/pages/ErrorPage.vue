<template>
  <div class="container">
    <div class="wrapper">
      <h1>Error 404</h1>
      <h2><RouterLink :to="{ name: 'apartments' }"> Go to Home</RouterLink></h2>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 80px;
  height: 86vh;
  margin: 0 auto;
}
</style>
