<script></script>
<template lang="">
  <button type="button" class="button">
    <svg class="button__icon">
      <use xlink:href="@/assets/svg/sprite.svg#icon-back"></use>
    </svg>
  </button>
</template>

<style scoped lang="scss">
.button {
  background-color: transparent;
  border: none;
  cursor: pointer;

  &__icon {
    width: 42px;
    height: 42px;

    fill: $main-color;
    @media screen and (min-width: 768px) {
      width: 64px;
      height: 64px;
    }
    &:hover,
    &:focus {
      fill: $activeColor;
      transition: $transition;
    }
  }
}
</style>
