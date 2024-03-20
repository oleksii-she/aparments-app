<script setup>
import { ref, watchEffect } from 'vue'
import { useAuthStore } from '@/stores'
import { useApiApartmentsStore } from '@/stores/useStores/useApartmentStore'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import Modal from '../global/modal.vue'
import BackBtn from '../global/BackBtn.vue'
import { useRouter } from 'vue-router'
import URating from '../global/URating.vue'

import Reserve from '../addReserve.vue'

const emits = defineEmits(['update:updateRating'])
const props = defineProps({
  apartment: { type: Object, required: true },
  id: String,
  someLocalProperty: {
    type: Number,
    default: 2
  },
  updateReserve: {
    type: Function,
    default: () => {}
  },
  handleRatingUpdate: {
    type: Function,
    default: () => {}
  }
})

const { fetchApartmentsDelleteId } = useApiApartmentsStore()

const { id, isAuth } = useAuthStore()
const router = useRouter()

const toggleModalRemove = ref(false)

const loading = ref(false)
const isVote = ref(false)

const toggleReserve = ref(false)
const currentSlide = ref(0)
const toggleImg = ref(false)
const imgLink = ref(null)

watchEffect(async () => {
  if (id !== props.apartment.owner) {
    const userVoted = props.apartment.ratings.find((el) => el.user === id)

    if (userVoted) {
      isVote.value = true

      console.log(props.apartment.rating)
    }
    if (isVote.value) {
      emits('update:updateRating', true)
    }
  }
})

const hideReserve = () => {
  toggleReserve.value = !toggleReserve.value
}
const hideModalRemove = () => {
  toggleModalRemove.value = !toggleModalRemove.value
}
const hideToggleImg = () => {
  toggleImg.value = !toggleImg.value
}

const apartmentDellete = async (id) => {
  try {
    loading.value = true
    await fetchApartmentsDelleteId(id)
    loading.value = false
    router.push({ name: 'apartments' })
  } catch (error) {
    console.log(error.message)
  }
}

const onReserve = () => {
  if (!isAuth) {
    router.push({ name: 'login' })
    return
  }
  toggleReserve.value = !toggleReserve.value
}

const images = [...props.apartment.images, props.apartment.coverImage]

const goBack = () => {
  router.go(-1)
}

const roundedRating = (rating) => {
  return Math.round(rating)
}

const slideTo = (index) => {
  currentSlide.value = index
}
const onClickToggleImg = (img) => {
  imgLink.value = img
  toggleImg.value = true
}

console.log(props.apartment, 'apartment')
</script>

<template>
  <div class="review-wrapper">
    <BackBtn class="button-back" @click="goBack">back</BackBtn>
    <div class="review-box">
      <div class="heading">
        <h2 class="heading__title">{{ apartment.name }}</h2>
        <URating :rating="roundedRating(apartment.rating)" />
      </div>
      <div class="img-gallery">
        <carousel :items-to-show="1" class="carousel" v-model="currentSlide">
          <slide v-for="image in images" :key="image">
            <div class="carousel__item" @click="onClickToggleImg(image)">
              <img :src="image" :alt="apartment.name" class="img" />
            </div>
          </slide>

          <template #addons>
            <navigation />
          </template>
        </carousel>
        <div class="img-gallery__thumb">
          <Carousel id="thumbnails" :items-to-show="3" :wrap-around="true" v-model="currentSlide">
            <Slide v-for="(slide, index) in images" :key="index">
              <div class="carousel__item" @click="slideTo(index)">
                <img :src="slide" :alt="apartment.name" class="img-thumb" />
              </div>
            </Slide>
          </Carousel>
        </div>
        <Modal v-if="toggleImg" :toggleModal="toggleImg" :hideDialog="hideToggleImg" :padding="0">
          <img :src="imgLink" :alt="apartment.name" class="img" />
        </Modal>
      </div>
      <div class="price">
        <ul class="price__list">
          <li class="price__item">
            <p class="price__text"><span>Address:</span> {{ apartment.address }}</p>
          </li>
          <li class="price__item">
            <p class="price__text"><span>Price per night:</span> {{ apartment.price }}$</p>
          </li>
          <li class="price__item">
            <p class="price__text">
              <span>Price from 3 nights:</span> {{ apartment.longStayPrice }}$
            </p>
          </li>
        </ul>
      </div>
      <div class="description">
        <p class="description__text">{{ apartment.description }}</p>
      </div>
      <div class="button-box" v-if="!apartment.reserved">
        <UButton v-if="id !== apartment.owner" class="button-box__button" @click="onReserve"
          >Reserve</UButton
        >

        <UButton v-else class="button-box__button" @click="toggleModalRemove = true"
          >Remove</UButton
        >
      </div>
      <div class="button-box" v-else>
        <UButton style="background-color: silver" v-if="id !== apartment.owner" disabled="true"
          >Reserved</UButton
        >

        <UButton v-else class="button-box__button" @click="updateReserve(apartment._id)"
          >remove reserve</UButton
        >
      </div>
    </div>
    <div class="info-wrapper">
      <div>
        <div class="info-user">
          <div>
            <RouterLink
              v-if="isAuth"
              class="user-link"
              :to="{ name: 'userId-info', params: { id: apartment.owner } }"
            >
              <h2 class="info-user__title">Information about the owner:</h2>
              <p class="user-text">Name: {{ apartment.user.user }}</p>
              <p class="user-text">Tel: {{ apartment.user.phone }}</p>
              <p class="user-text">E-mail: {{ apartment.user.email }}</p></RouterLink
            >
            <RouterLink v-else class="user-link" :to="{ name: 'login' }">
              <h2 class="info-user__title">Information about the owner:</h2>
              <p class="user-text">Name: {{ apartment.user.user }}</p>
              <p class="user-text">Tel: {{ apartment.user.phone }}</p>
              <p class="user-text">E-mail: {{ apartment.user.email }}</p></RouterLink
            >

            <div v-if="apartment.user.userRating" style="text-align: end; margin-top: 12px">
              <URating :rating="roundedRating(apartment.user.userRating)" />
            </div>
          </div>
        </div>
        <ul class="country-list">
          <li class="country-list__item">
            <h3 class="country-list__title">Country: {{ apartment.country }}</h3>
          </li>
          <li class="country-list__item">
            <p>
              Location: <span class="country-list__span"> {{ apartment.location }}</span>
            </p>
          </li>
        </ul>
      </div>
      <slot />

      <Modal v-if="toggleModalRemove" :toggleModal="toggleModalRemove" :hideDialog="hideModalRemove"
        ><div class="remove">
          <h2>Are you sure you want to delete?</h2>
          <div class="remove-btn-wrapper">
            <UButton @click="apartmentDellete(apartment._id)">Yes</UButton>
            <UButton @click="hideModalRemove">No</UButton>
          </div>
        </div>
        <ULoader :loading="loading" />
      </Modal>
      <Modal v-if="toggleReserve" :toggleModal="toggleReserve" :hideDialog="hideReserve"
        ><Reserve
          :id="apartment._id"
          :price="apartment.price"
          :longPrice="apartment.longStayPrice"
          :hideReserve="hideReserve"
      /></Modal>
    </div>
  </div>
</template>

<style scoped lang="scss">
.user-link {
  color: $main-color;
  &:hover {
    color: $activeColor;
    transition: $transition;
  }
}
.review-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
  @media screen and (min-width: 1280px) {
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 0;
  }
}

.button-back {
  @media screen and (max-width: 767px) {
    position: absolute;
    left: 0;
  }
}
.country-list {
  margin-top: 15px;
  margin-bottom: 0;
  padding-top: 19px;
  padding-right: 39px;
  padding-left: 20px;
  padding-bottom: 19px;
  width: 350px;
  background-color: $reviews;
  &__item {
    margin-bottom: 12px;
    & + & {
      margin-bottom: 0;
    }
  }

  &__span {
    color: $activeColor;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
  }
}

.remove {
  width: 600px;
  text-align: center;
  padding: 40px;
}
.remove-btn-wrapper {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: row;
    gap: 30px;
  }
}

.heading {
  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    &__title {
      font-weight: 700;
      font-size: 20px;
      line-height: 24px;
      margin-right: 20px;
    }
  }

  @media screen and (min-width: 1280px) {
    justify-content: flex-start;
  }
}

.info-user {
  padding-top: 19px;
  padding-right: 39px;
  padding-left: 20px;
  padding-bottom: 10px;
  background: #e1efff;
  width: 350px;
}
.info-user__title {
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
}
.title {
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
}

.button-box {
  margin-bottom: 20px;

  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: center;
    &__button {
      margin: 0;
    }
  }
}

.main-img {
  height: 410px;
}

.img-gallery {
  position: relative;

  &__thumb {
    position: absolute;
    bottom: -7%;
  }
}

.carousel {
  @media screen and (min-width: 768px) {
    width: 435px;
  }
}
.carousel__item {
  min-height: 200px;
  width: 100%;
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 768px) {
    width: 435px !important;
  }
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
.price {
  &__list {
    // display: flex;
    // flex-direction: column;
    // row-gap: 10px;
    background-color: #e1efff;
    border-radius: 8px;
    width: 350px;
    padding: 20px;

    // @media screen and (min-width: 768px) {
    //   display: flex;
    //   width: 600px;

    //   justify-content: center;
    //   align-items: center;
    //   flex-direction: row;
    //   column-gap: 30px;
    // }
    li {
      margin-bottom: 8px;
      border-bottom: 1px solid $main-color;

      p {
        color: $activeColor;
      }
      span {
        color: $main-color;
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  &__text {
    font-size: 20px;
    line-height: 24px;

    @media screen and (min-width: 768px) {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      // flex-direction: column;
      align-items: center;
    }
  }
}

.description {
  width: 350px;
  text-align: left;
  padding: 10px;
  min-height: 210px;
  margin-bottom: 8px;

  @media screen and (min-width: 768px) {
    width: 600px;
  }
  &__description {
    @media screen and (min-width: 768px) {
      font-size: 16px;
      line-height: calc(20 / 16);
      margin-bottom: 24px;
    }
    @media screen and (min-width: 1280px) {
      width: 600px;
      min-height: 159px;
    }
  }
}
.img {
  max-width: 100%;
  border-radius: 20px;
  max-height: 480px;
  object-fit: cover;
}

.img-thumb {
  max-width: 75%;
}

.info-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.review-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
