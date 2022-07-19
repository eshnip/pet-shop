<template>
  <div class="catalog">
    <template v-if="productsLength">
      <div class="catalog__rate">
        <input
          v-model.number="rate"
          type="number"
          :min="minRate"
          :max="maxRate"
          @keypress.prevent
        >
        Курс $
      </div>

      <div class="catalog__controls">
        <CatalogFilter @filter-products="setProductsByFilterValue" />
        <CatalogSort @sort-products="setProductsBySortValue" />
      </div>

      <div class="catalog__list">
        <CatalogListGroup
          v-for="group in productsList"
          :key="group.id"
          :group="group"
        />
      </div>
    </template>

    <div
      v-else
      class="catalog__preloader"
    />

    <AppAlert
      v-if="alertIsActive"
      :class="{'alert--is-active': alertIsActive}"
      label="Данные обновлены"
    />
  </div>
</template>

<script lang="ts">
import {onMounted, onBeforeUnmount, computed, ref, defineComponent} from '@vue/composition-api'
import CatalogListGroup from '@/components/Catalog/CatalogListGroup.vue'
import CatalogFilter from '@/components/Catalog/CatalogFilter.vue'
import CatalogSort from '@/components/Catalog/CatalogSort.vue'
import AppAlert from '@/components/Alert/Alert.vue'
import {minRate, maxRate} from '@/constants/rate'
import {useAlert} from '@/components/Alert/composables/useAlert'
import {useCatalogStore} from '@/stores/catalog'
import {storeToRefs} from 'pinia'
import {getRandom} from '@/helpers/getRandom'
import {delay} from '@/helpers/delay'
import {IGroup} from '@/types/IGroup'
import {SortValues} from '@/types/SortValues'
import {FilterValues} from '@/types/FilterValues'

export default defineComponent({
  name: 'CatalogPage',
  components: {CatalogListGroup, CatalogFilter, CatalogSort, AppAlert},
  setup() {
    const catalog = useCatalogStore()
    const productsList = ref<IGroup[] | null>(null)
    const {catalog: allProducts, rate, availableProducts, catalogSortedPriceToDown, catalogSortedPriceToUp} = storeToRefs(catalog)
    const {saveProductsToState} = catalog
    const {showAlert, alertIsActive} = useAlert()
    let updateDataInterval: number

    delay(1000).then(saveProductsToState).then(() => productsList.value = allProducts.value)

    onMounted(() => {
      updateDataInterval = setInterval(() => {
        rate.value = getRandom(minRate, maxRate)
        saveProductsToState()
        showAlert()
      }, 5000)
    })

    onBeforeUnmount(() => clearInterval(updateDataInterval))

    const productsLength = computed(() => allProducts.value?.length)

    const setProductsByFilterValue = (type: FilterValues) => productsList.value = type === FilterValues.Available ? availableProducts.value : allProducts.value

    const setProductsBySortValue = (sortBy: SortValues) => productsList.value = sortBy === SortValues.PriceToUp ? catalogSortedPriceToUp.value : catalogSortedPriceToDown.value

    return {
      productsLength,
      alertIsActive,
      rate,
      minRate,
      maxRate,
      setProductsByFilterValue,
      setProductsBySortValue,
      productsList
    }
  },
})
</script>

<style scoped lang="scss">
@import "./styles/catalog-page";
</style>
