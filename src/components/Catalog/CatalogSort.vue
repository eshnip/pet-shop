<template>
  <div class="catalog-sort">
    <button
      v-for="btn in catalogSortBtns"
      :key="btn.id"
      class="catalog-sort__btn"
      :class="{'catalog-sort__btn--is-active' : isActiveBtn === btn.id}"
      @click="toggleActiveBtn(btn.id)"
    >
      {{ btn.label }}
    </button>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from '@vue/composition-api'
import {catalogSortBtns} from '@/constants/catalogSortBtns'

export default defineComponent({
  name: 'CatalogSort',
  setup(_, {emit}) {
    const isActiveBtn = ref('')

    const toggleActiveBtn = (id: string) => {
      isActiveBtn.value = id
      emit('sort-products', id)
    }

    return {
      toggleActiveBtn,
      isActiveBtn,
      catalogSortBtns
    }
  }
})
</script>

<style scoped lang="scss">
@import "./styles/catalog-sort";
</style>
