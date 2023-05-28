<script setup>
import { appStore } from '@/stores'

const store = appStore()
</script>
<template>
  <div :class="!store.isOpen ? 'burger' : 'open burger'" @click="store.toggleOpen()">
    <span class="burger__span"></span>
    <span class="burger__span"></span>
    <span class="burger__span"></span>
  </div>
</template>

<style scoped lang="scss">
.burger {
  position: absolute;
  right: 0;
  top: 60px;
  transform-origin: 16px 11px;
  outline: 0;
  border: 0;
  padding: 12px;
  background: none;
  cursor: pointer;
  z-index: 555;
  &__span {
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    display: block;
    height: 5px;
    margin-bottom: 7px;
    width: 30px;
    background-color: $main-color;
  }
}

.open .burger__span:first-child {
  transform: rotate(45deg) translate(10px, 10px);
}

.open .burger__span:nth-child(2) {
  opacity: 0;
  pointer-events: none;
}

.open .burger__span:last-child {
  transform: rotate(-45deg) translate(7px, -7px);
}
</style>
