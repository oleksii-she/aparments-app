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
  <li>
    <div class="image__wrapper">
      <RouterLink :to="{ name: 'review-page', params: { id } }">
        <img :src="coverImage" alt="" class="image_home" />
        <div class="content">
          <p class="content__text-country">{{ country }}</p>
          <p class="content__text">{{ description }}</p>
          <URating :rating="roundedRating" />
          <p class="content__price">USD {{ price }} за ніч</p>
          <p class="content__price">USD {{ longStayPrice }} від 3-х ночей</p>
        </div>
      </RouterLink>
    </div>
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

.image__wrapper {
  position: relative;
  cursor: pointer;
}

.image_home {
  object-fit: cover;
  width: calc(100vw - 24px);
  height: calc(100hv - 24px);

  @media screen and (min-width: 768px) {
    width: calc(100vw / 2 - 110px);
    min-height: 220px;
  }
  @media screen and (min-width: 1280px) {
    width: 360px;
    height: 220px;
  }
}

.content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: absolute;
  top: 0;
  opacity: 0;
  transition: opacity 0.4s;
  background: rgba(#0f1d2d, 0.7);
  width: calc(100vw - 24px);
  height: calc(100hv - 24px);
  @media screen and (min-width: 768px) {
    width: calc(100vw / 2 - 110px);
    height: calc(100vw / 2 - 110px);
    min-height: 220px;
  }
  @media screen and (min-width: 1280px) {
    width: 360px;
    height: 220px;
  }

  color: #fff;
  text-align: left;
  line-height: 1.4;
  cursor: pointer;
  z-index: 1;

  padding: 20px;

  &:hover {
    opacity: 1;
  }

  &__text,
  &__text-country {
    width: 270px;
    color: #ffffff;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;

    font-weight: 500;
    font-size: 16px;
    line-height: calc(20 / 16);
  }

  &__price {
    font-weight: 700;
    font-size: 20px;
    line-height: calc(24 / 20);
    color: #ffffff;
  }
}
</style>
