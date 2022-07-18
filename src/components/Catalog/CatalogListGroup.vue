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
import CatalogListItem from '@/components/Catalog/CatalogListItem.vue'
import {computed, defineComponent, PropType} from '@vue/composition-api'
import {IGroup} from '@/types/IGroup'

export default defineComponent({
  name: 'CatalogListGroup',
  components: { CatalogListItem },
  props: {
    group: {
      type: Object as PropType<IGroup>,
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
