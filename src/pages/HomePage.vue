<script setup>
// import VPagination from '@hennge/vue3-pagination'
import { ref, watchEffect, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useApiApartmentsStore,useAuthStore } from '@/stores'
import ApartmentList from '@/components/apartment/apartmentList.vue'
import ApartmentsItem from '@/components/apartment/apartmentItem.vue'
import Pagination from '../components/global/pagination.vue'
import { allCountries } from '../services/apiOther'
import Modal from'../components/global/modal.vue'
import PhoneWarning from'../components/phoneWarning.vue'
const apiStore = useApiApartmentsStore()
const route = useRoute()
const router = useRouter()
const perPage = 9
const authStore=useAuthStore()

const selectedCountry = ref(null)
const selectedPrice = ref(null)
const page = ref(parseInt(route.query.page) || 1)
const countries = ref(['All countries'])
const phoneWarningToggle = ref(false)

let renderApartmentHandler = false

watchEffect(async () => {

 

  router.push({ query: { ...route.query, page: page.value } })
  await apiStore.fetchApartments(page.value, selectedCountry.value)

  if (selectedCountry.value === 'All countries') {
    selectedCountry.value = null
  }

  const fetchCountries = await allCountries()
  countries.value = fetchCountries.data.countries


 
})

watchEffect(async ()=>{
  const {token} = route.query
  if (token) {
    await authStore.current(token)
    router.push({ name: 'apartments' })
  }
  phoneWarningToggle.value = false;

  if (authStore.isAuth ) {
    if (!authStore.phone && phoneWarningToggle.value === false) {
  phoneWarningToggle.value = true;
} else if (authStore.phone && phoneWarningToggle.value === true) {
  phoneWarningToggle.value = false;
}
  }
})
watch(selectedPrice, async () => {
  if (selectedPrice.value < 0) {
    return
  }
  if (selectedPrice.value !== '') {
    renderApartmentHandler = true
    apiStore.sortPrice(selectedPrice.value)
  } else {
    apiStore.sortPrice(false)
    renderApartmentHandler = false
  }
})
</script>

<template>
  <main>
    <section class="home-page">
      <div class="container">
        <Modal v-if="phoneWarningToggle" :toggleModal="phoneWarningToggle">
          <PhoneWarning  @update:value="phoneWarningToggle.value = $event"   />

</Modal>

        <div class="select-wrapper">
          <USelect
            v-if="countries"
            :countries="countries"
            v-model="selectedCountry"
            :defaultOption="'All countries'"
          />
          <UInput
            v-if="countries"
            v-model="selectedPrice"
            type="number"
            placeholder="Ціна, від"
            :defaultValidate="true"
          />
        </div>
        <ULoader :loading="true" v-if="apiStore.loading" />
        <div class="home-page__wrapper" v-else>
          <h3 v-if="countries" class="select-title">Підборка згідно вибору</h3>
          <ApartmentList
            :apartments="!renderApartmentHandler ? apiStore.apartments : apiStore.filter"
          >
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
        <Pagination
          v-if="apiStore.apartments.length > 7"
          class="paginate"
          v-model="page"
          :perPage="perPage"
          :rangeSize="1"
          active-color="#DCEDFF"
          @update:value="page = $event"
          :totalPost="apiStore.totalPosts"
        />
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
.select-title {
  font-weight: 700;
  font-size: 20px;
  line-height: calc(24 / 20);
  margin-top: 12px;
  margin-bottom: 12px;
  @media screen and (min-width: 768px) {
    margin-top: 20px;
    margin-bottom: 20px;
  }
}
.select-wrapper {
  display: flex;
  row-gap: 20px;

  flex-direction: column;
  align-items: center;
  @media screen and (min-width: 768px) {
    gap: 31px;
    flex-direction: row;
  }
}
.home-page__wrapper {
  min-height: 75vh;

  align-items: center;
  justify-content: flex-end;
  flex-direction: column-reverse;
}
.paginate {
  /* margin-top: 8px; */
  justify-content: center;
}
.home-page {
  padding-top: 15px;
}
</style>
