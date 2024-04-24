

<script>
import { state } from './socket'

export default {
  name: 'ConnectionState',

  computed: {
    connected() {
      return state.connected
    }
  }
}
</script>

<template>
  <p class="state">State: {{ connected }}</p>
</template>

<style scoped lang="scss">
.state {
  background-color: $background;
  color: $main-color;
}
</style>
