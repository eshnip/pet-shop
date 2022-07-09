<template>
  <div class="catalog">
    <template v-if="productsLength">
      <div class="catalog__rate">
        <input
          v-model.number="rate"
          type="number"
          @keypress.prevent
          :min="minRate"
          :max="maxRate"
        >
        Курс $
      </div>

      <div class="catalog__controls">
        <CatalogFilter @filter-products="setProductsByFilterValue"/>
        <CatalogSort @sort-products="setProductsBySortValue"/>
      </div>

      <div class="catalog__list">
        <CatalogListGroup
          v-for="group in productsList"
          :group="group"
          :key="group.id"
        />
      </div>
    </template>

    <div class="catalog__preloader" v-else></div>

    <Alert v-if="alertIsActive" :class="{'alert--is-active': alertIsActive}" label="Данные обновлены"/>

  </div>
</template>

<script>
import {onMounted, onBeforeUnmount, computed, ref} from '@vue/composition-api'
import CatalogListGroup from "@/components/Catalog/CatalogListGroup";
import CatalogFilter from "@/components/Catalog/CatalogFilter";
import CatalogSort from "@/components/Catalog/CatalogSort";
import {useAlert} from '@/components/Alert/composables/useAlert'
import Alert from '@/components/Alert/Alert'
import {useCatalogStore} from "@/stores/catalog";
import {storeToRefs} from 'pinia'
import {minRate, maxRate} from '@/constants/rate'
import {getRandom} from '@/helpers/getRandom'
import {delay} from '@/helpers/delay'
import {priceToUp} from "@/constants/catalogSortBtns";
import {onlyAvailableProducts} from "@/constants/catalogFilterBtns";


export default {
  name: "CatalogPage",
  components: {CatalogListGroup, CatalogFilter, CatalogSort, Alert},

  setup() {
    const catalog = useCatalogStore();

    const {catalog: allProducts, rate, availableProducts, catalogSortedPriceToDown, catalogSortedPriceToUp} = storeToRefs(catalog)
    const {saveProductsToState, fetchProductsData} = catalog
    const {showAlert, alertIsActive} = useAlert()
    const productsList = ref([])
    const sort = ref()

    delay(1000).then(saveProductsToState).then(() => productsList.value = allProducts.value)

    let updateDataInterval = null;

    onMounted(() => {
      updateDataInterval = setInterval(() => {
        rate.value = getRandom(minRate, maxRate)
        fetchProductsData()
        showAlert()
      }, 5000)
    })

    onBeforeUnmount(() => clearInterval(updateDataInterval))

    const productsLength = computed(() => allProducts.value?.length)

    const setProductsByFilterValue = type => productsList.value = type === onlyAvailableProducts ? availableProducts.value : allProducts.value

    const setProductsBySortValue = sortBy => {
      sort.value = sortBy
      productsList.value = sort.value === priceToUp ? catalogSortedPriceToUp.value : catalogSortedPriceToDown.value
    }

    return {
      productsLength,
      alertIsActive,
      rate,
      minRate,
      maxRate,
      setProductsByFilterValue,
      setProductsBySortValue,
      productsList
    };
  },
}
</script>

<style scoped lang="scss">
@import "./styles/catalog-page";
</style>
