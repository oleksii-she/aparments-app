<script setup></script>

<template>
  <button class="button__universal"><slot /></button>
</template>

<style scoped lang="scss">
.button__universal {
  background-color: $secondary-color;
  width: 220px;
  height: 56px;
  @media screen and (min-width: 768px) {
    width: 220px;
    height: 56px;
    padding: 5px 20px;
  }

  @media screen and (min-width: 1280px) {
    width: 349px;
    height: 56px;
    padding: 9px 40px;
  }

  border: none;
  color: $background;
  cursor: pointer;
  &:hover,
  &:focus {
    background-color: rgb(237, 88, 1);
  }
}
</style>
