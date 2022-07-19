<template>
  <div class="catalog-filter">
    <button
      v-for="btn in catalogFilterBtns"
      :key="btn.id"
      class="catalog-filter__btn"
      :class="{'catalog-filter__btn--is-active' : isActiveBtn === btn.id}"
      @click="toggleActiveBtn(btn.id)"
    >
      {{ btn.label }}
    </button>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from '@vue/composition-api'
import {useCatalogStore} from '@/stores/catalog'
import {FilterValues} from '@/types/FilterValues'
import {catalogFilterBtns} from '@/constants/catalogFilterBtns'

export default defineComponent({
  name: 'CatalogFilter',
  emits: ['filterProducts'],
  setup(_, {emit}) {

    const {catalog, availableProducts} = useCatalogStore()
    const isActiveBtn = ref('')

    const toggleActiveBtn = (id: FilterValues) => {
      isActiveBtn.value = id
      emit('filter-products', id)
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
