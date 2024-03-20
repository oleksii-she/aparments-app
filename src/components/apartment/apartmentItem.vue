<script setup>
import { RouterLink } from 'vue-router'
import URating from '../global/URating.vue'
const props = defineProps({
  id: String,
  coverImage: String,
  description: String,
  country: String,
  price: Number,
  longStayPrice: Number,
  rating: Number
})
const roundedRating = Math.round(props.rating)
</script>
<template>
  <li class="apartment-item">
    <RouterLink :to="{ name: 'review-page', params: { id } }">
      <img :src="coverImage" alt="" class="apartment-item__image" />

      <div class="content">
        <h2>{{ country }}</h2>
        <p class="content__text">{{ description }}</p>
        <p class="content__price">USD {{ price }} за ніч</p>
        <p class="content__price">USD {{ longStayPrice }} від 3-х ночей</p>
        <URating :rating="roundedRating" />
      </div>
    </RouterLink>
  </li>
</template>

<style scoped lang="scss">
.home__Wrapper {
  position: relative;
}

.loader {
  position: absolute;
  left: 45%;
  top: 100px;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.apartment-item {
  cursor: pointer;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
  width: 100%;
  @media screen and (min-width: 768px) {
    width: calc((100% / 2) - 20px);
  }

  @media screen and (min-width: 1280px) {
    position: relative;
    width: calc((100% / 3) - 20px);
  }

  @media screen and (min-width: 1920px) {
    width: calc((100% / 4) - 20px);
  }

  &__image {
    object-fit: cover;
    width: 100%;
    max-width: 408px;

    @media screen and (min-width: 1280px) {
      height: 220px;
    }
  }
}

.content {
  display: flex;
  flex-direction: column;
  color: $main-color;

  padding-bottom: 16px;
  border-bottom: 2px solid $main-color;

  @media screen and (min-width: 1280px) {
    border-bottom: 0;
    position: absolute;
    background: rgba(#0f1d2d, 0.7);
    width: 100%;
    height: 220px;
    padding: 25px;
    top: 0;
    opacity: 0;
    transition: opacity 0.4s;

    &:hover {
      opacity: 1;
      transition: $transition;
    }
  }
  h2 {
    width: 270px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;

    font-weight: 700;
    font-size: 22px;
    line-height: calc(20 / 16);
    margin-bottom: 8px;

    @media screen and (min-width: 1280px) {
      color: #ffffff;
    }
  }

  p {
    margin-bottom: 8px;
    &:last-child {
      margin-bottom: 0;
    }
    @media screen and (min-width: 1280px) {
      color: #ffffff;
    }
  }

  &__price {
    &:first-child {
      margin-top: 8px;
    }

    font-weight: 700;
    font-size: 20px;
    line-height: calc(24 / 20);
  }
}
</style>



