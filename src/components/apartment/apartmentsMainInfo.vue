<script setup>
import { ref, reactive, watchEffect } from 'vue'
import { createToaster } from '@meforma/vue-toaster'
import { useAuthStore } from '@/stores'
import { useApiApartmentsStore } from '@/stores/useStores/useApartmentStore'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import Modal from '../global/modal.vue'
import { useRouter } from 'vue-router'
import URating from '../global/URating.vue'
import AddRating from '../AddRating.vue'

const props = defineProps({
  apartment: { type: Object, required: true },
  someLocalProperty: {
    type: Number,
    default: 2
  }
})
const toaster = createToaster({ position: 'top' })
const { addCommentPost, comments, fetchCommentDelleteId, fetchApartmentsDelleteId } =
  useApiApartmentsStore()

const { id, isAuth, email } = useAuthStore()

const addComment = reactive({ comment: '' })

const toggle = ref(false)
const toggleModal = ref(false)
const toggleModalRemove = ref(false)
const removeToggleComment = ref(false)
const loading = ref(false)
const isVote = ref(false)

watchEffect(() => {
  if (id !== props.apartment.owner) {
    const userVoted = props.apartment.ratings.find((el) => el.user === id)

    if (userVoted) {
      isVote.value = true
    }
  }
})
const router = useRouter()

const handlerAddComment = async () => {
  try {
    if (addComment.comment.trim() === '') {
      return console.log('додайте коментар')
    }
    if (addComment.comment.length < 5) {
      return toaster.error('The comment should be longer')
    }
    const formData = new FormData()
    formData.append('comment', addComment.comment)
    await addCommentPost(props.apartment._id, addComment)
    addComment.comment = ''
    hideDialog()
  } catch (error) {
    console.log(error.message)
  }
}

const deleteComment = async (id) => {
  try {
    const index = comments.findIndex((item) => item._id === id)

    if (index !== -1) {
      comments.splice(index, 1)
    }

    await fetchCommentDelleteId(id)
  } catch (error) {
    console.log(error.message)
  }
}

const toggleReadMore = () => {
  toggle.value = !toggle.value
}

const onModal = () => {
  toggleModal.value = !toggleModal.value
}
const hideDialog = () => {
  toggleModal.value = !toggleModal.value
}
const hideModalRemove = () => {
  toggleModalRemove.value = !toggleModalRemove.value
}

const apartmentDellete = async (id) => {
  try {
    loading.value = true
    await fetchApartmentsDelleteId(id)
    loading.value = false
    router.push({ name: 'home' })
  } catch (error) {
    console.log(error.message)
  }
}

const images = [...props.apartment.images, props.apartment.coverImage]

const roundedRating = Math.round(props.apartment.rating)
</script>
<template>
  <div class="review-wrapper">
    <div class="review-box">
      <div class="heading">
        <h2 class="heading__title">{{ apartment.name }}</h2>
        <URating :rating="roundedRating" />
      </div>
      <carousel :items-to-show="1" class="carousel">
        <slide v-for="image in images" :key="image">
          <img :src="image" :alt="apartment.name" class="img" />
        </slide>

        <template #addons>
          <navigation />
        </template>
      </carousel>
      <div class="price">
        <ul class="price__list">
          <li class="price__item">
            <p class="price__text"><span>Address</span> {{ apartment.address }}</p>
          </li>
          <li class="price__item">
            <p class="price__text"><span>Price per night</span> {{ apartment.price }}$</p>
          </li>
          <li class="price__item">
            <p class="price__text">
              <span>Price from 3 nights</span> {{ apartment.longStayPrice }}$
            </p>
          </li>
        </ul>
        <p class="price__description">{{ apartment.description }}</p>
      </div>

      <div class="button-box">
        <UButton v-if="id !== apartment.owner" class="button-box__button">Reserve</UButton>
        <UButton v-else class="button-box__button" @click="toggleModalRemove = true"
          >Remove</UButton
        >
      </div>
    </div>
    <div class="info-wrapper">
      <div class="info-user">
        <h2 class="info-user__title">Information about the owner:</h2>
        <p class="user-text">Name: {{ apartment.user.user }}</p>
        <p class="user-text">Tel: {{ apartment.user.phone }}</p>
        <p class="user-text">E-mail: {{ apartment.user.email }}</p>
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
      <h2 :style="{ marginBottom: '20px', marginTop: '20px' }">Reviews</h2>
      <div class="reviews">
        <p>{{ comments.length }} Reviews</p>
        <h2 class="reviews__title">BAD RATING</h2>

        <div v-if="id !== apartment.owner && email !== apartment.user.email && isAuth">
          <h3>Leave a rating</h3>
          <h5 v-if="isVote">Thank you for voting</h5>
          <AddRating :id="apartment._id" @update:isVote="isVote = $event" v-else />
        </div>
      </div>
      <div class="comments-wrapper" v-if="!comments.length !== 0">
        <div v-for="item in comments" :key="item._id" class="comments">
          <div class="comments-box" v-if="item.comment.length > 1">
            <div class="avatar-box">
              <div class="avatar-circle">
                <svg class="avatar-circle__svg">
                  <use xlink:href="@/assets/svg/sprite.svg#icon-user"></use>
                </svg>
              </div>
              <p>{{ item.user.name }}</p>
            </div>
            <div class="comment">
              <p class="comment__text" v-if="!toggle">{{ item.comment.slice(0, 70) + '...' }}</p>
              <p class="comment__text" v-else>{{ item.comment }}</p>
              <button v-if="item.comment.length > 70" @click="toggleReadMore">
                {{ !toggle ? 'Читати далі' : 'cкоротити' }}
              </button>
              <button @click="deleteComment(item._id)" v-if="!removeToggleComment">Remove</button>
            </div>
          </div>
        </div>
      </div>

      <UButton v-if="isAuth" @click="onModal" class="button__add-response">Leave a comment</UButton>

      <Modal v-if="toggleModal" :toggleModal="toggleModal" :hideDialog="hideDialog">
        <form @submit.prevent.stop="handlerAddComment" class="form-response">
          <h2>Write a review</h2>
          <textarea class="form-response__text" v-model="addComment.comment"></textarea>
          <UButton type="submit">Send</UButton>
        </form>
      </Modal>

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
    </div>
  </div>
</template>

<style scoped lang="scss">
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

.comments-wrapper {
  max-height: 389px;
  overflow: auto;
  margin-bottom: 25px;
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

.info-user {
  padding-top: 19px;
  padding-right: 39px;
  padding-left: 20px;
  padding-bottom: 30px;
  background: #e1efff;
  width: 350px;
}
.main-img {
  height: 410px;
}

/* .carousel {
  /* max-width: 90%;
  height: 50%;
  margin-bottom: 30px; */
/* }  */

.slide {
  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 500px;
  }
}

.price {
  &__list {
    background-color: #e1efff;
    @media screen and (min-width: 768px) {
      display: flex;
      width: 600px;
      padding-left: 0;
      justify-content: space-between;
      align-items: center;
    }
  }

  &__description {
    @media screen and (min-width: 768px) {
      font-size: 16px;
      line-height: calc(20 / 16);
      margin-bottom: 24px;
    }
    @media screen and (min-width: 1280px) {
      width: 600px;
    }
  }

  &__text {
    font-size: 20px;
    line-height: 24px;
    @media screen and (min-width: 768px) {
      display: flex;
      gap: 8px;
      flex-direction: column;
      align-items: center;
    }
  }
}
.img {
  max-width: 100%;

  max-height: 410px;
  object-fit: cover;
}
.comments {
  margin-bottom: 8px;
}
.avatar-box {
  display: flex;
  align-items: center;
  padding: 17px;
  gap: 15px;
}
.avatar-circle {
  background-color: $secondary-color;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  &__svg {
    width: 26px;
    fill: white;
  }
}

.comment {
  padding-left: 20px;
  padding-right: 20px;

  &__text {
    width: 270px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
    margin-bottom: 20px;

    font-weight: 500;
    font-size: 16px;
    line-height: calc(20 / 16);
  }
}
.reviews {
  background-color: $reviews;
  padding: 12px;
  width: 350px;
  &__title {
    font-weight: 700;
    font-size: 20px;
    line-height: calc(24 / 20);
    margin-bottom: 7px;
  }
}

.comments-box {
  mix-blend-mode: normal;
  border: 2px solid #e1efff;
}

.avatar-box {
  margin-bottom: 19px;
}

.form-response {
  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  &__text {
    margin-top: 25px;
    margin-bottom: 16px;
    @media screen and (min-width: 1280px) {
      width: 700px;
      height: 500px;
    }
    width: 284px;
    height: 170px;
    border: 2px solid $secondary-color;

    outline: rgb(237, 88, 1);
    padding: 8px 11px;
    cursor: pointer;
    resize: none;
    &:hover,
    &:focus {
      border-color: rgb(237, 88, 1);
    }

    font-size: 18px;
    line-height: calc(22 / 18);
  }
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
