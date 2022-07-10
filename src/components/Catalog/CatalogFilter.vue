<template>
  <div class="catalog-filter">
    <button
      v-for="btn in filterBtns"
      :key="btn.name"
      class="catalog-filter__btn"
      :class="{'catalog-filter__btn--is-active' : isActiveBtn === btn.name}"
      @click="toggleActiveBtn(btn.name)"
    >
      {{ btn.label }}
    </button>
  </div>
</template>

<script>
import {ref} from '@vue/composition-api'
import {catalogFilterBtns} from '@/constants/catalogFilterBtns'
import {useCatalogStore} from '@/stores/catalog'

export default {
  name: 'CatalogFilter',
  emits: ['filterProducts'],
  setup(_, {emit}) {

    const {catalog, availableProducts} = useCatalogStore()
    const filterBtns = catalogFilterBtns()
    const isActiveBtn = ref('')

    const toggleActiveBtn = (name) => {
      isActiveBtn.value = name
      emit('filter-products', name)
    }

    return {
      catalog,
      availableProducts,
      toggleActiveBtn,
      isActiveBtn,
      filterBtns
    }
  }
}
</script>

<style scoped lang="scss">
@import "./styles/catalog-filter";
</style>
