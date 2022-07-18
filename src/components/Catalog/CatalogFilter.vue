<template>
  <div class="catalog-filter">
    <button
      v-for="btn in catalogFilterBtns"
      :key="btn.name"
      class="catalog-filter__btn"
      :class="{'catalog-filter__btn--is-active' : isActiveBtn === btn.name}"
      @click="toggleActiveBtn(btn.name)"
    >
      {{ btn.label }}
    </button>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from '@vue/composition-api'
import {useCatalogStore} from '@/stores/catalog'
import {FilterValues} from '@/types/filter'
import {catalogFilterBtns} from '@/constants/catalogFilterBtns'

export default defineComponent({
  name: 'CatalogFilter',
  emits: ['filterProducts'],
  setup(_, {emit}) {

    const {catalog, availableProducts} = useCatalogStore()
    const isActiveBtn = ref('')

    const toggleActiveBtn = (name: FilterValues) => {
      isActiveBtn.value = name
      emit('filter-products', name)
    }

    return {
      catalog,
      availableProducts,
      toggleActiveBtn,
      isActiveBtn,
      catalogFilterBtns
    }
  }
})
</script>

<style scoped lang="scss">
@import "./styles/catalog-filter";
</style>
