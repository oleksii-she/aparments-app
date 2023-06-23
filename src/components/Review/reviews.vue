<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, reactive, watchEffect } from 'vue'
import { useApiApartmentsStore, useAuthStore } from '@/stores'
import { createToaster } from '@meforma/vue-toaster'
import AddRating from '../AddRating.vue'
import Modal from '../global/modal.vue'

const emits = defineEmits(['update:updateRating'])
const props = defineProps({
  apartment: { type: Object, required: true },
  handleRatingUpdate: {
    type: Function,
    default: () => {}
  }
})
const { id, isAuth, email } = useAuthStore()
const apartmentsStore = useApiApartmentsStore()

const addComment = reactive({ comment: '' })

const toggle = ref(false)
const toggleModal = ref(false)
const removeToggleComment = ref(false)
const isVote = ref(false)
const page = ref(1)

const toaster = createToaster({ position: 'top' })

watchEffect(async () => {
  try {
    if (id !== props.apartment.owner) {
      const userVoted = props.apartment.ratings.find((el) => el.user === id)

      if (userVoted) {
        isVote.value = true
      }
      if (isVote.value) {
        emits('update:updateRating', true)
      }
    }
    if (page.value === 1) {
      await apartmentsStore.fetchGetComments(props.apartment._id, page)
    } else {
      await apartmentsStore.fetchAddComments(props.apartment._id, page)
    }
  } catch (error) {
    console.log(error.message)
  }
})

const getRatingForComment = (id) => {
  const rating = props.apartment.ratings.find((el) => el.user === id)

  if (rating) {
    return rating.rating
  } else {
    return 0
  }
}

const toggleReadMore = () => {
  toggle.value = !toggle.value
}
const hideDialog = () => {
  toggleModal.value = !toggleModal.value
}

const roundedRating = (rating) => {
  return Math.round(rating)
}
const deleteComment = async (id) => {
  try {
    const index = apartmentsStore.comments.findIndex((item) => item._id === id)

    if (index !== -1) {
      apartmentsStore.comments.splice(index, 1)
    }

    await apartmentsStore.fetchCommentDelleteId(id)
  } catch (error) {
    console.log(error.message)
  }
}

const handlerAddComment = async () => {
  try {
    if (!isVote.value) {
      return console.log('додайте відгук')
    }
    if (addComment.comment.trim() === '') {
      return console.log('додайте коментар')
    }
    if (addComment.comment.length < 5) {
      return toaster.error('The comment should be longer')
    }

    await apartmentsStore.addCommentPost(props.apartment._id, { comment: addComment.comment })
    addComment.comment = ''
    hideDialog()
  } catch (error) {
    console.log(error.message)
  }
}

const onPageClick = () => {
  page.value = page.value + 1
}
</script>
<template lang="">
  <div>
    <h2 :style="{ marginBottom: '20px', marginTop: '20px' }">Reviews</h2>

    <div class="reviews">
      <h2 class="reviews__title">Overall rating</h2>
      <div class="reviews__overall-rating-wrapper">
        <p>{{ apartmentsStore.comments.length }} Reviews</p>
        <URating :rating="roundedRating(apartment.rating)" />
      </div>
      <div class="comments-wrapper" v-if="!apartmentsStore.comments.length !== 0">
        <div v-for="item in apartmentsStore.comments" :key="item._id" class="comments">
          <div class="comments-box" v-if="item.comment.length > 1">
            <div class="avatar-box">
              <div class="avatar-circle">
                <svg class="avatar-circle__svg">
                  <use xlink:href="@/assets/svg/sprite.svg#icon-user"></use>
                </svg>
              </div>
              <p>{{ item.user.name }}</p>
              <URating :rating="getRatingForComment(item.user.id)" />
            </div>
            <div class="comment">
              <p class="comment__text" v-if="!toggle">{{ item.comment.slice(0, 70) + '...' }}</p>
              <p class="comment__text-read-more" v-else>{{ item.comment }}</p>
              <button v-if="item.comment.length > 70" @click="toggleReadMore">
                {{ !toggle ? 'Read more' : 'shorten' }}
              </button>
              <button
                @click="deleteComment(item._id)"
                v-if="!removeToggleComment && id === item.user.id"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="load-more">
        <p @click="onPageClick" class="load-more__text">Read more...</p>
      </div>
    </div>
    <UButton v-if="isAuth" @click="toggleModal = true" class="button__add-response"
      >Leave a comment</UButton
    >
    <Modal v-if="toggleModal" :toggleModal="toggleModal" :hideDialog="hideDialog">
      <form @submit.prevent.stop="handlerAddComment" class="form-response">
        <div v-if="id !== apartment.owner && email !== apartment.user.email && isAuth">
          <h3>Leave a rating</h3>
          <h5 v-if="isVote">Thank you for voting</h5>
          <AddRating
            :id="apartment._id"
            @update:isVote="isVote = $event"
            :ratingVote="handleRatingUpdate"
            v-else
          />
        </div>
        <h2>Write a review</h2>
        <textarea class="form-response__text" v-model="addComment.comment"></textarea>
        <UButton type="submit">Send</UButton>
      </form>
    </Modal>
  </div>
</template>

<style scoped lang="scss">
.reviews {
  background-color: $reviews;
  padding-top: 12px;
  padding-bottom: 14px;
  width: 350px;
  &__title {
    font-weight: 700;
    font-size: 20px;
    line-height: calc(24 / 20);
    margin-bottom: 7px;
  }

  &__overall-rating-wrapper {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
}

.comments {
  background-color: $background;
  margin-bottom: 8px;

  @media screen and (max-width: 768px) {
    overflow: scroll;
  }
}

.load-more {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
  &__text {
    font-size: 16px;
    line-height: calc(16 / 18);
    cursor: pointer;
    &:hover {
      color: $activeColor;
      transition: $transition;
    }
  }
}

.comments-box {
  mix-blend-mode: normal;
  border: 2px solid #e1efff;
}
.comments-wrapper {
  max-height: 389px;
  overflow: auto;
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

  &__text-read-more {
    width: 270px;
    font-weight: 500;
    font-size: 16px;
    line-height: calc(20 / 16);
  }
}

.avatar-box {
  display: flex;
  align-items: center;
  padding: 17px;
  gap: 15px;
  margin-bottom: 19px;
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

.form-response {
  background: $background;
  padding: 20px;
  border-radius: 20px;
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

    &:hover,
    &:focus {
      border-color: rgb(237, 88, 1);
    }

    font-size: 18px;
    line-height: calc(22 / 18);
  }
}
</style>
