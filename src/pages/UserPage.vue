<script setup>
// import VPagination from '@hennge/vue3-pagination'
import { vMask } from '@opentf/vue-input-mask'
import { ref, watchEffect, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore, useUserStore } from '@/stores'
import { formatPhoneNumber, convertPhoneNumber } from '@/utils/formatPhoneNumber'
import ApartmentList from '../components/apartment/apartmentList.vue'
import ApartmentsItem from '@/components/apartment/apartmentItem.vue'
import Pagination from '../components/global/pagination.vue'
import { createToaster } from '@meforma/vue-toaster'

const route = useRoute()
const router = useRouter()
const perPage = 9
const userStore = useUserStore()
const page = ref(parseInt(route.query.page) || 1)
const authStore = useAuthStore()
const toaster = createToaster({ position: 'top' })
const targetValue = reactive({
  name: false,
  phone: false
})

const userValue = reactive({
  name: '',
  phone: ''
})

const userInfo = ref({})
const routeIdValue = ref(null)

watchEffect(async () => {
  const { id } = authStore
  router.push({ query: { ...route.query, page: page.value } })
  const routeId = route.params.id
  if (routeId) {
    await userStore.fetchUserApartments(routeId, page.value)

    const { user, phone, email, userRating } = userStore.apartments[2].user
    const rating = Math.round(userRating)
    userInfo.value = { user, phone, email, rating }
    routeIdValue.value = routeId
  } else {
    userStore.fetchUserApartments(id, page.value)
  }
  userValue.name = authStore.name
  if (authStore.phone) {
    const number = formatPhoneNumber(authStore.phone)
    userValue.phone = number
  }
})

const changeUpdateUser = (e) => {
  if (e.target.name === 'name') {
    userValue.name = e.target.value
  }
  if (e.target.name === 'phone') {
    const newValue = e.target.value
    const regex = /^\+38\(\d{3}\)\d{3}-\d{2}-\d{2}$/

    if (regex.test(newValue)) {
      userValue.phone = e.target.value
    }
  }
}

const updateValue = async () => {
  try {
    const phone = convertPhoneNumber(userValue.phone)
    const name = userValue.name
    const data = {
      phone,
      name
    }
    await authStore.fetchUpdateUser(data)
    targetValue.phone = false
    targetValue.name = false
  } catch (error) {
    targetValue.phone = false
    targetValue.name = false
    if (error.request.status === 400) {
      userValue.phone = authStore.phone
      return toaster.warning(error.request.response)
    } else {
      console.log(error.message)
    }
  }
}
</script>

<template>
  <main>
    <section>
      <div class="container user-page">
        <div class="home-page__wrapper">
          <div class="user-wrapper">
            <div class="user" v-if="!routeIdValue">
              <div class="wrapper">
                <div v-if="!targetValue.name" class="user__text-wrapper">
                  <p class="user__text">і’мя: {{ userValue.name }}</p>
                  <button @click="targetValue.name = true" class="btn-edit">
                    <svg class="btn-edit__icon">
                      <use xlink:href="@/assets/svg/sprite.svg#icon-edit"></use>
                    </svg>
                  </button>
                </div>
                <div v-else class="user__text-wrapper">
                  <label class="user__text">
                    і’мя:
                    <input
                      class="user__input-rename"
                      name="name"
                      :value="userValue.name"
                      @change="changeUpdateUser"
                    />
                  </label>
                  <button @click="updateValue" class="btn-edit">
                    <svg class="btn-edit__icon">
                      <use xlink:href="@/assets/svg/sprite.svg#icon-confirm"></use>
                    </svg>
                  </button>
                </div>
              </div>
              <div class="user__text-wrapper">
                <p class="user__text">E-mail: {{ authStore.email }}</p>
              </div>

              <div class="wrapper">
                <div v-if="!targetValue.phone" class="user__text-wrapper">
                  <p class="user__text" v-if="userValue.phone">Телефон: {{ userValue.phone }}</p>
                  <p class="user__text" v-else>Телефон: +38(000)000-00-00</p>
                  <button @click="targetValue.phone = true" class="btn-edit">
                    <svg class="btn-edit__icon">
                      <use xlink:href="@/assets/svg/sprite.svg#icon-edit"></use>
                    </svg>
                  </button>
                </div>
                <div v-else class="user__text-wrapper">
                  <label class="user__text">
                    Телефон:
                    <input
                      ref="phoneInput"
                      v-mask="{ mask: '+38(0##)###-##-##' }"
                      class="user__input-rename"
                      type="tel"
                      name="phone"
                      :value="userValue.phone"
                      @change="changeUpdateUser"
                    />
                  </label>
                  <button @click="updateValue" class="btn-edit">
                    <svg class="btn-edit__icon">
                      <use xlink:href="@/assets/svg/sprite.svg#icon-confirm"></use>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div class="user" v-else>
              <div class="wrapper">
                <div class="user__text-wrapper">
                  <p class="user__text">Name: {{ userInfo.user }}</p>
                </div>

                <div class="user__text-wrapper">
                  <p class="user__text">Email: {{ userInfo.email }}</p>
                </div>

                <div class="user__text-wrapper">
                  <p class="user__text">Phone: {{ formatPhoneNumber(userInfo.phone) }}</p>
                </div>
              </div>
            </div>
            <div class="user-rating-box">
              <h3>User rating</h3>

              <URating :width="50" :height="50" :rating="userInfo.rating" />
            </div>
          </div>
          <div>
            <ULoader :loading="true" v-if="userStore.loading" />
            <ApartmentList :apartments="userStore.apartments">
              <template v-slot:apartment="slotProps">
                <ApartmentsItem
                  :id="slotProps.apartment._id"
                  :coverImage="slotProps.apartment.coverImage"
                  :description="slotProps.apartment.description"
                  :price="slotProps.apartment.price"
                  :longStayPrice="slotProps.apartment.longStayPrice"
                  :country="slotProps.apartment.country"
                  :rating="slotProps.apartment.rating"
                />
              </template>
            </ApartmentList>
          </div>
        </div>
        <Pagination
          v-if="userStore.totalPosts > 9 && !userStore.loading"
          class="paginate"
          v-model="page"
          :perPage="perPage"
          :rangeSize="1"
          active-color="#DCEDFF"
          @update:value="page = $event"
          :totalPost="userStore.totalPosts"
        />
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
.home-page__wrapper {
  padding-top: 15px;
  min-height: 80vh;

  align-items: center;
  justify-content: flex-end;
  flex-direction: column-reverse;

  @media screen and (min-width: 768px) {
    padding-top: 20px;
  }
}
.paginate {
  margin-top: 8px;
  justify-content: center;
}

.user-wrapper {
  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
}

.user-rating-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  @media screen and (min-width: 768px) {
    margin-bottom: 0;
  }
}
.user {
  display: block;
  padding: 8px;
  width: 282px;
  background-color: $reviews;
  margin-bottom: 20px;
  @media screen and (min-width: 768px) {
    width: 300px;
    margin-bottom: 15px;
  }

  &__text-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    border-bottom: 1px solid $main-color;
    width: 100%;
  }
  &__text {
    width: 250px;
    font-size: 16px;
    line-height: calc(19 / 16);
  }

  &__input-rename {
    background-color: transparent;
    border: none;
    outline: none;
    width: 160px;
  }
}
.btn-edit {
  background-color: transparent;
  border: none;
  width: 28px;
  height: 28px;
  cursor: pointer;
  display: flex;
  align-items: center;
  &__icon {
    width: 22px;
    height: 22px;
    &:hover,
    &:focus {
      fill: $activeColor;
    }
  }
}
</style>
