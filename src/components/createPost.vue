<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { computed, reactive, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'vue-router'
import { useApiApartmentsStore } from '@/stores/useStores/useApartmentStore'
import { useAuthStore } from '@/stores'
import { countriesApi } from '../services/apiOther'
import { createToaster } from '@meforma/vue-toaster'
import { watchEffect } from 'vue'
import Modal from'./global/modal.vue'
import PhoneWarning from './phoneWarning.vue'
const authStore=useAuthStore()
const createPost = reactive({
  name: '',
  location: '',
  country: '',
  address: '',
  rooms: 1,
  price: 40,
  longStayPrice: 30,
  description: '',
  images: [],
  coverImage: '',
  apartmentClass: ''
})
const apartmentStore = useApiApartmentsStore()
const router = useRouter()
const toaster = createToaster({ position: 'top' })

const loading = ref(false)
const countries = ref(null)
const showCountriesList = ref(true)
const input = ref(null)
const phoneWarningToggle = ref(false)


watchEffect(() => {
  if (authStore.phone === '+380000000000') {
    phoneWarningToggle.value = true
  } else {
    phoneWarningToggle.value = false
  }
})

const fetchCountries = async () => {
  try {
    const result = await countriesApi(createPost.country)

    if (!result || result === null) {
      showCountriesList.value = false
      countries.value = ''
    } else {
      showCountriesList.value = true
      countries.value = result
    }
  } catch (error) {
    console.log(error.message)
  }
}

const countrieHandler = (countrie) => {
  showCountriesList.value = false
  createPost.country = countrie
  countries.value = null
}

const defaultImages = [
  '../assets/svg/sprite.svg#icon-cancel-circle',
  '@/assets/svg/sprite.svg#icon-create__img',
  '@/assets/svg/sprite.svg#icon-create__img',
  '@/assets/svg/sprite.svg#icon-create__img',
  '@/assets/svg/sprite.svg#icon-create__img'
]

const defaultImagesCOPY = reactive([...defaultImages])

const previewFilePath = computed(() => {
  if (createPost.coverImage) {
    return URL.createObjectURL(createPost.coverImage)
  }
  return null
})

const previewFilesPath = computed(() => {
  if (createPost.images) {
    return createPost.images.map((el) => {
      if (createPost.images.length > 6) {
        return
      }
      return { id: el.id, path: URL.createObjectURL(el.file), name: el.name }
    })
  }

  return null
})

const uploadFile = (e) => {
  const file = e.target.files[0]
  if (file) {
    createPost.coverImage = file
  }
}

const uploadFiles = (event) => {
  const file = event.target.files[0]
  const formData = new FormData()
  formData.append('image', file)
  if (!file || createPost.images.length > 5) {
    return
  }
  if (file) {
    defaultImagesCOPY.splice(0, 1)
    createPost.images.push({ id: uuidv4(), file })
  }
}

const deleteCoverImage = () => {
  if (createPost.coverImage) {
    createPost.coverImage = null
  }
}

const delleteFile = (id) => {
  createPost.images = createPost.images.filter((el) => el.id !== id)
  if (createPost.images.length === 5) {
    return
  }
  defaultImagesCOPY.push(defaultImages[0])
}

const openFileInput = () => {
  const fileInput = input.value
  if (fileInput) {
    fileInput.click()
  }
}

const onSubmit = async (e) => {
  const {
    name,
    location,
    country,
    address,
    rooms,
    price,
    longStayPrice,
    description,
    images,
    coverImage
  } = createPost

  const files = images.map((el) => el.file)

  const data = {
    coverImage,
    images: files,

    apartmentClass: e.target.select.value,
    name,
    location,
    country,
    address,
    rooms: Number(rooms),
    price: Number(price),
    longStayPrice: Number(longStayPrice),
    description
  }
  console.log(data)
  const formData = new FormData()
  formData.append('apartmentClass', data.apartmentClass)
  for (let i = 0; i < files.length; i++) {
    formData.append('images', files[i], files[i].name)
  }
  formData.append('coverImage', data.coverImage)
  formData.append('name', data.name)
  formData.append('location', data.location)
  formData.append('country', data.country)
  formData.append('address', data.address)
  formData.append('rooms', data.rooms)
  formData.append('price', data.price)
  formData.append('longStayPrice', data.longStayPrice)
  formData.append('description', data.description)

  if (
    !name ||
    !location ||
    !country ||
    !address ||
    !rooms ||
    !price ||
    !longStayPrice ||
    !description ||
    !coverImage
  ) {
    return toaster.warning(`Make sure all fields are filled`)
  }

  try {
    loading.value = true

    await apartmentStore.addApartmentPost(formData)
    loading.value = false
    router.push({ name: 'apartments' })
    return toaster.success('data successfully added')
  } catch (error) {
    console.log(error.message)
    return toaster.error(error.message)
  }
}

const hideModalRemove = ()=>{

  router.push({ name: 'apartments' })
  return phoneWarningToggle.value=!phoneWarningToggle.value
}
</script>

<template lang="">

  <ULoader :loading="loading" />
  <form @submit.prevent.stop="onSubmit" class="form__advertisement">
    <Modal v-if="phoneWarningToggle" :toggleModal='phoneWarningToggle' :hideDialog="hideModalRemove"><PhoneWarning/></Modal>
    <h2 class="title__form-create">Create an ad</h2>
    <div class="top__wrapper">
      <UInput v-model="createPost.name" placeholder="Назва оголошення" class="uinput">
        <p class="title-input">The name of the ad</p></UInput
      >

      <div>
        <UInput
          v-model="createPost.country"
          placeholder="Country"
          class="uinput"
          @input="fetchCountries"
        >
          <p class="title-input">Country</p></UInput
        >
        <ul class="countries-list" v-if="countries !== null" v-show="showCountriesList">
          <li
            v-for="(countrie, index) in countries"
            :key="index"
            class="countries-list__item"
            @click="countrieHandler(countrie.name.common)"
          >
            <p class="countries-list__text">{{ countrie.name.common }}</p>
          </li>
        </ul>
      </div>

      <UInput v-model="createPost.location" placeholder="Місто" class="uinput">
        <p class="title-input">Місто</p></UInput
      >
    </div>
    <div class="average__wrapper">
      <div class="main__photo">
        <h3 :style="{ marginBottom: '7px' }">Main photo</h3>
        <label for="" class="cover-img__wrapper">
          <button v-if="createPost.coverImage" class="clear-img" @click="deleteCoverImage">
            <svg class="clear-img__icon">
              <use xlink:href="@/assets/svg/sprite.svg#icon-cancel-circle"></use>
            </svg>
          </button>
          <div class="img__box">
            <img v-if="createPost.coverImage" :src="previewFilePath" alt="" class="image" />
          </div>
          <svg class="icon" v-if="!createPost.coverImage">
            <use xlink:href="@/assets/svg/sprite.svg#icon-create__img"></use>
          </svg>
          <input
            type="file"
            name="coverImage"
            accept="image/*"
            class="input__file__hidden"
            multiple
            @change="uploadFile"
          />
        </label>
      </div>

      <div class="input-block__right">
        <div class="input-wrapper">
          <UInput
            v-model="createPost.rooms"
            placeholder="Кількість кімнат"
            class="uinput"
            type="number"
          >
            <p class="title-input">Number of rooms</p></UInput
          >
          <UInput v-model="createPost.address" placeholder="Адреса" class="uinput">
            <p class="title-input">Address</p></UInput
          >
          <div class="price">
            <p class="title-input">Price per night</p>

            <div class="price__wrapper">
              <h2 class="price__title">$</h2>
              <UInput
                v-model="createPost.price"
                placeholder="Price per night"
                class="uinput"
                type="number"
              >
              </UInput>
            </div>
          </div>
          <div class="price">
            <p class="title-input">Price from three nights</p>
            <div class="price__wrapper">
              <h2 class="price__title">$</h2>
              <UInput
                v-model="createPost.longStayPrice"
                placeholder="Price from three nights"
                class="uinput"
                type="number"
                style="width: 70px"
              >
              </UInput>
            </div>
          </div>
        </div>
        <UInput
          v-model="createPost.description"
          placeholder="Опишіть апартаменти"
          type="textarea"
          class="uinput"
        >
          <p class="title-input">Describe the apartments</p></UInput
        >
        <div>
          <p class="title-input">Apartment class</p>
          <select name="select" class="select">
            <option value="Economy">Economy</option>
            <option value="Comfort" selected>Comfort</option>
            <option value="Business">Business</option>
            <option value="Premium">Premium</option>
            <option value="Lux">Lux</option>
          </select>
        </div>
      </div>
    </div>
    <div class="bottom-wrapper">
      <label for="" class="img__file-wrapper" v-if="createPost.images.length !== 6">
        <svg class="icon" v-if="createPost.images">
          <use xlink:href="@/assets/svg/sprite.svg#icon-create__img"></use>
        </svg>
        <input
          type="file"
          name="images"
          accept="image/*"
          class="input__file__hidden"
          @change="uploadFiles"
          ref="input"
        />
      </label>
      <div v-for="image in defaultImagesCOPY" :key="image">
        <div class="img__file-wrapper" @click="openFileInput">
          <svg class="">
            <use xlink:href="../assets/svg/sprite.svg#icon-camera"></use>
          </svg>
        </div>
      </div>
      <div v-for="image in previewFilesPath" :key="image.id" class="img__box">
        <img :src="image.path" alt="" class="images" />
        <button @click="delleteFile(image.id)" class="clear-img">
          <svg class="clear-img__icon">
            <use xlink:href="@/assets/svg/sprite.svg#icon-cancel-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <UButton  v-if="!phoneWarningToggle">Create an ad</UButton>
  </form>
</template>

<style scoped lang="scss">
.form__advertisement {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0;
  @media screen and (max-width: 768px) {
    padding-top: 20px;
  }

}
.input-wrapper {
  @media screen and (min-width: 1280px) {
    display: grid;
    grid-template-columns: 200px 300px;
  }
}
.title-input {
  margin-bottom: 10px;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;

  @media screen and (min-width: 1280px) {
    margin-bottom: 6px;
  }
}
.select {
  cursor: pointer;
  margin-bottom: 20px;

  @media screen and (min-width: 1280px) {
    margin-bottom: 0;
  }
}
.title__form-create {
  text-align: center;
  margin-bottom: 15px;
}

.top__wrapper {
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;

  @media screen and (min-width: 1280px) {
    flex-direction: row;
    justify-content: space-between;
    column-gap: 60px;
  }
}
.main__photo {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
  @media screen and (min-width: 1280px) {
    display: flex;
  }
}
.average__wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;

  @media screen and (min-width: 1280px) {
    display: flex;
    flex-direction: row;
    gap: 30px;
    margin-bottom: 25px;
  }
}

.input__item {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.input-block__right {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}

.cover-img__wrapper {
  position: relative;
  width: 320px;
  height: 320px;
  background-color: #fdf7f2;
  align-items: center;
  justify-content: center;
  display: flex;
  @media screen and (min-width: 768px) {
    width: 340px;
    height: 340px;
  }

  @media screen and (min-width: 1280px) {
    width: 480px;
    height: 480px;
  }
}
.img__box {
  position: relative;
}

.image {
  object-fit: cover;
  width: 320px;
  height: 320px;
  @media screen and (min-width: 768px) {
    width: 320px;
    height: 320px;
  }
  @media screen and (min-width: 1280px) {
    width: 480px;
    height: 480px;
  }
}
.images {
  width: 240px;
  height: 240px;
  @media screen and (min-width: 768px) {
    width: 320px;
    height: 320px;
  }
}
.delete__photo {
  position: absolute;
  left: 0;
  background-color: transparent;
  border: none;
}
.uinput {
  @media screen and (min-width: 1280px) {
    margin-bottom: 0;
  }
}
.img__file-wrapper {
  position: relative;
  width: 240px;
  height: 240px;
  background-color: #fdf7f2;
  align-items: center;
  justify-content: center;
  display: flex;
  cursor: pointer;
  @media screen and (min-width: 1280px) {
    width: 320px;
    height: 320px;
  }
}
.clear-img {
  position: absolute;
  top: -10px;
  right: -10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: transparent;
  border: none;
  z-index: 99;
  &__icon {
    width: 28px;
    height: 28px;
    fill: rgb(10, 6, 25);
    &:hover {
      fill: $activeColor;
    }
  }
}
.icon {
  position: absolute;
  width: 50px;
  height: 50px;
  vertical-align: middle;
  fill: currentColor;
}
.input__file__hidden {
  width: 100px;
  height: 100px;
  opacity: 0;
  cursor: pointer;
}

.bottom-wrapper {
  display: flex;
  flex-wrap: wrap;
  grid-gap: 25px;
  margin-bottom: 25px;
  justify-content: center;
  align-items: center;
}

.loader {
  position: fixed;
  top: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.countries-list {
  position: absolute;
  background-color: $white;
  z-index: 999;
  width: 285px;

  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  max-height: 400px;
  overflow: scroll;

  &__item {
    cursor: pointer;
    padding: 5px;
    margin-bottom: 5px;
    &:hover {
      background-color: $header;
    }
  }

  &__text {
    color: $activeColor;
  }
}

.input__universal {
  border: 2px solid $secondary-color;
  outline: rgb(237, 88, 1);
  padding: 12px 31px;
  cursor: pointer;
  &:hover,
  &:focus {
    border-color: rgb(237, 88, 1);
  }

  font-size: 18px;
  line-height: calc(22 / 18);
}

.price {
  margin-top: 25px;

  &__wrapper {
    display: flex;
    align-items: center;
    position: relative;
  }
  &__title {
    position: absolute;
    z-index: 999;
    top: 8px;
    left: 130px;

    margin-right: 8px;
  }
}
</style>
