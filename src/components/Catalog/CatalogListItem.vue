<template>
  <li
    class="catalog-list-item"
    :class="{'catalog-list-item--is-disabled' : !product.price } "
    @click="addItemToCart(product)"
  >
    <div class="catalog-list-item__title">
      {{ product.title }}
    </div>
    <template v-if="product.price">
      <div
        class="catalog-list-item__price"
        :class="priceClass"
      >
        {{ price }} RUB
      </div>
    </template>
    <template v-else>
      <div class="catalog-list-item__price">
        Товар закончился
      </div>
    </template>
  </li>
</template>

<script lang="ts">
import {useCatalogStore} from '@/stores/catalog'
import {useCartStore} from '@/stores/cart'
import {ref, watch, computed, toRefs, defineComponent, PropType} from '@vue/composition-api'
import {storeToRefs} from 'pinia'
import {priceToFixed} from '@/helpers/priceToFixed'
import {IProduct} from '@/types/IProduct'

export default defineComponent({
  name: 'CatalogListItem',
  props: {
    product: {
      type: Object as PropType<IProduct>,
      default: () => ({})
    },
  },
  setup(props) {
    const priceClass = ref('')
    const {product} = toRefs(props)
    const catalog = useCatalogStore()
    const {rate} = storeToRefs(catalog)
    const {addItemToCart} = useCartStore()

    watch(() => rate.value, (newV, oldV) => {
      priceClass.value = (newV > oldV ? 'catalog-list-item__price--up' : 'catalog-list-item__price--down')
    })

    const price = computed(() => priceToFixed(product.value.price * rate.value))

    return {
      addItemToCart,
      rate,
      price,
      priceClass
    }
  }
})
</script>

<style scoped lang="scss">
@import './styles/catalog-list-item';
</style>
