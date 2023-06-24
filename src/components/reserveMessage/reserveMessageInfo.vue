<script setup>
import dayjs from 'dayjs'
import { watchEffect, ref } from 'vue'

const props = defineProps({
  reserveInfo: Object,
  updateReserve: {
    type: Function,
    default: () => {}
  }
})

const reservedToggle = ref(null)

watchEffect(async () => {
  if (props.reserveInfo && typeof props.reserveInfo.reserved !== 'undefined') {
    const reserved = props.reserveInfo.reserved
    reservedToggle.value = reserved
  }
})

const formatDateTime = (datetime) => {
  const now = dayjs()
  const backendDateTime = dayjs(datetime)

  if (backendDateTime.isSame(now, 'day')) {
    return backendDateTime.format('HH:mm:ss')
  } else {
    return backendDateTime.format('MM.DD')
  }
}

const onReserve = (id) => {
  reservedToggle.value = true
  props.updateReserve(id)
}
</script>

<template>
  <div class="wrapper-info" v-if="reserveInfo">
    <div class="header">
      <div class="info">
        <p class="info__header-text">Name: {{ reserveInfo.name }}</p>
        <a class="info__email-link" href="mailto:{{ reserveInfo.email }}">{{
          reserveInfo.email
        }}</a>
      </div>
      <div class="button-box">
        <button type="" class="button" @click="onReserve(reserveInfo.apartmentId)">
          <svg
            class="button__icon-reserved"
            :class="{
              'button__icon-reserved---active': reservedToggle
            }"
          >
            <use xlink:href="/src/assets/svg/sprite.svg#icon-reserved"></use>
          </svg>
        </button>

        <button type="" class="button">
          <svg class="button__icon">
            <use xlink:href="/src/assets/svg/sprite.svg#icon-delete"></use>
          </svg>
        </button>
      </div>
    </div>
    <div>
      <RouterLink
        v-if="reserveInfo.apartmentId"
        :to="{ name: 'review-page', params: { id: reserveInfo.apartmentId } }"
        class="wrapper-info__apartment-link"
      >
        <img :src="reserveInfo.coverImage" alt="" width="64" />
        <p>{{ reserveInfo.apartmentName }}</p>
      </RouterLink>
    </div>
    <div>
      <div class="price-date">
        <div>
          <p class="price-date__text">sum: {{ reserveInfo.sum }}$</p>
          <p class="price-date__text">number of days: {{ reserveInfo.numberOfDays }}</p>
        </div>

        <div>
          <p class="price-date__text">Start date: {{ reserveInfo.startDate }}$</p>
          <p class="price-date__text">End date: {{ reserveInfo.endDate }}</p>
        </div>
      </div>
    </div>
    <div class="description-box">
      <p class="description-box__date">{{ formatDateTime(reserveInfo.updatedAt) }}</p>
      <p class="description-box__description">{{ reserveInfo.description }}</p>
    </div>
  </div>

  <div class="wrapper-info-default" v-else>
    <div>
      <h2>Select a message to read it</h2>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper-info-default {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 100px);
}

.wrapper-info {
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;

  .button-box {
    display: flex;
    column-gap: 12px;
  }
  .button {
    background-color: transparent;
    border: none;
    cursor: pointer;

    &__icon {
      width: 27px;
      height: 27px;
      &:hover,
      &:focus {
        fill: $activeColor;
        transition: $activeColor;
      }
    }

    &__icon-reserved {
      width: 64px;
      height: 64px;

      &:hover,
      &:focus {
        fill: $activeColor;
        color: $activeColor;
      }
    }
    &__icon-reserved---active {
      fill: $activeColor;
      &:hover,
      &:focus {
        color: $activeColor;
      }
    }
  }

  &__apartment-link {
    display: flex;
    justify-content: space-between;
    color: $main-color;
    border-bottom: 1px solid rgb(216, 223, 224);
    margin-bottom: 20px;
    padding-bottom: 20px;
    &:hover,
    &:focus {
      color: $activeColor;
    }
  }
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgb(216, 223, 224);
  margin-bottom: 20px;
}
.info {
  &__header-text {
    margin-bottom: 10px;
  }
  &__email-link {
    color: $main-color;
    &:hover,
    &:focus {
      color: $activeColor;
      transition: $transition;
    }
  }
}

.price-date {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  &__text {
    margin-bottom: 10px;

    & + & {
      margin-bottom: 0;
    }
  }
}
.description-box {
  &__date {
    text-align: center;
    margin-bottom: 15px;
  }
}
</style>
