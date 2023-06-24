<script setup></script>

<template>
  <div class="container">
    <div class="wrapper">
      <router-link to="/answers" class="reserve-message">
        <svg class="reserve-message__icon">
          <use xlink:href="@/assets/svg/sprite.svg#icon-message"></use>
        </svg>
        <div class="reserve-message__circle">
          <div class="circle__content">
            {{ totalReservePost }}
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  position: relative;
  right: -20px;
}
.reserve-message {
  position: fixed;
  z-index: 200;
  right: 2%;
  bottom: 48px;
  background-color: transparent;
  border: none;
  &__icon {
    width: 60px;
    height: 60px;
    fill: $activeColor;
  }

  @media screen and (min-width: 768px) {
    position: absolute;
    right: 10px;
    top: 10px;
  }
  outline: none;
  cursor: pointer;

  &:hover,
  &:hover .reserve-message__icon,
  &:hover .reserve-message__circle,
  &:hover .reserve-message__circle .circle__content {
    fill: $main-color;
    color: $main-color;
    border-color: $main-color;
    transition: cubic-bezier(0.075, 0.82, 0.165, 1);
  }

  &:hover .reserve-message__circle {
    background: radial-gradient(transparent 50%, $main-color 50%);
    transition: cubic-bezier(0.075, 0.82, 0.165, 1);
  }

  &__circle {
    width: 30px;
    height: 30px;

    border-radius: 50%;
    background: radial-gradient(transparent 50%, $activeColor 50%);

    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.circle__content {
  color: $activeColor;
}
</style>
