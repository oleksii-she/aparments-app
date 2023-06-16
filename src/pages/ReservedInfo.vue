<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useReserversStore } from '@/stores'
import { ref, watchEffect } from 'vue'
import ReserveMessageList from '@/components/reserveMessage/reserveMessageList.vue'
import { useScreenSize } from '@/utils/useScreenSize'
import ULoader from '../components/global/ULoader.vue'
import { useRoute, useRouter } from 'vue-router'
import reserveMessageInfo from '../components/reserveMessage/reserveMessageInfo.vue'

</script>
<template>
  <div>
    <reserveMessageInfo />
  </div>
</template>

<style lang="scss">
.reserved-wrapper {
  padding-top: 20px;
  display: flex;
  &__info {
    width: 100%;
  }
}

.reserved-mobile {
  flex-direction: column;
}
</style>
