<template>
  <div class="catalog-list-group">
    <div class="catalog-list-group__header">
      <span class="catalog-list-group__title">{{ group.name }}</span>
    </div>
    <ul
      v-if="productsInGroupLength"
      class="catalog-list-group__items"
    >
      <CatalogListItem
        v-for="product in group.products"
        :key="product.id"
        :product="product"
        class="catalog-list-group__item"
      />
    </ul>
    <div
      v-else
      class="catalog-list-group__empty"
    >
      Нет товаров в наличие
    </div>
  </div>
</template>

<script lang="ts">
import CatalogListItem from '@/components/Catalog/CatalogListItem'
import {computed, defineComponent} from '@vue/composition-api'

export default defineComponent({
  name: 'CatalogListGroup',
  components: { CatalogListItem },
  props: {
    group: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const productsInGroupLength = computed(() => props.group.products?.length)

    return {
      productsInGroupLength
    }
  }
})
</script>

<style scoped lang="scss">
@import './styles/catalog-list-group';
</style>
