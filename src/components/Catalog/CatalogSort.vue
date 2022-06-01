<template>
  <div class="catalog-sort">
    <button v-for="btn in sortBtns"
            :key="btn.name"
            class="catalog-sort__btn"
            :class="{'catalog-sort__btn--is-active' : isActiveBtn === btn.name}"
            @click="toggleActiveBtn(btn.name)"
    >
      {{ btn.label }}
    </button>
  </div>
</template>

<script>
import {ref} from '@vue/composition-api';
import {catalogSortBtns} from "@/constants/catalogSortBtns";

export default {
  name: "CatalogSort",
  setup(_, {emit}) {
    const isActiveBtn = ref('')

    const toggleActiveBtn = (name) => {
      isActiveBtn.value = name
      emit('sort-products', name)
    }

    return {
      toggleActiveBtn,
      isActiveBtn,
      sortBtns: catalogSortBtns
    }
  }
}
</script>

<style scoped lang="scss">
@import "./styles/catalog-sort";
</style>
