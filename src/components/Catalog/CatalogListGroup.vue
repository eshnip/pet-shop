<template>
  <div class="catalog-list-group">
    <div class="catalog-list-group__header">
      <span class="catalog-list-group__title">{{ group.name }}</span>
    </div>
    <ul class="catalog-list-group__items" v-if="productsInGroupLength">
      <CatalogListItem
          v-for="product in group.products"
          :key="product.id"
          :product="product"
          class="catalog-list-group__item"
      />
    </ul>
    <div class="catalog-list-group__empty" v-else>Нет товаров в наличие</div>
  </div>
</template>

<script>
import CatalogListItem from '@/components/Catalog/CatalogListItem'
import {computed} from '@vue/composition-api'

export default {
  name: 'CatalogListGroup',
  components: { CatalogListItem },
  props: {
    group: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const productsInGroupLength = computed(() => props.group.products?.length)

    return {
      productsInGroupLength
    }
  }
}
</script>

<style scoped lang="scss">
@import './styles/catalog-list-group';
</style>
