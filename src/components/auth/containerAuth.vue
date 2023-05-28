<!-- eslint-disable vue/multi-word-component-names -->
<script setup></script>
<template lang="">
  <div class="container__auth"><slot></slot></div>
</template>

<style scoped lang="scss">
.container__auth {
  background-color: $background;
  /* width: 410px;
  height: 298px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  /* display: flex;
  justify-content: center;
  flex-direction: column; */
  padding-top: 31px;
  padding-bottom: 29px;
  padding-left: 30px;
  padding-right: 30px;
}
</style>
