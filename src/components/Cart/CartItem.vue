<template>
  <div class="cart-item">
    <button
      type="button"
      class="cart-item__remove"
      @click="removeItem(item.id)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width="64"
        height="64"
      >
        <path
          fill="#E04F5F"
          d="M504.1 256C504.1 119 393 7.9 256 7.9S7.9 119 7.9 256 119 504.1 256 504.1 504.1 393 504.1 256z"
        />
        <path
          fill="#FFF"
          d="m285 256 72.5-84.2c7.9-9.2 6.9-23-2.3-31-9.2-7.9-23-6.9-30.9 2.3L256 222.4l-68.2-79.2c-7.9-9.2-21.8-10.2-31-2.3-9.2 7.9-10.2 21.8-2.3 31L227 256l-72.5 84.2c-7.9 9.2-6.9 23 2.3 31 4.1 3.6 9.2 5.3 14.3 5.3 6.2 0 12.3-2.6 16.6-7.6l68.2-79.2 68.2 79.2c4.3 5 10.5 7.6 16.6 7.6 5.1 0 10.2-1.7 14.3-5.3 9.2-7.9 10.2-21.8 2.3-31L285 256z"
        />
      </svg>
    </button>
    <div class="cart-item__name">
      {{ item.title }}
    </div>
    <CartItemInput
      :id="item.id"
      :qty="item.addedQty"
      :available="item.qty"
    />
    <div
      class="cart-item__price"
      :class="priceClass"
    >
      {{ price }} RUB / шт.
    </div>
    <div class="cart-item__total">
      {{ totalPriceValue }} RUB
    </div>
  </div>
</template>

<script lang="ts">
import {useCartStore} from '@/stores/cart'
import {defineComponent, ref, computed, toRefs, watch, PropType} from '@vue/composition-api'
import {priceToFixed} from '@/helpers/priceToFixed'
import {useCatalogStore} from '@/stores/catalog'
import {storeToRefs} from 'pinia'
import {IProduct} from '@/types/IProduct'
import CartItemInput from '@/components/Cart/CartItemInput'

export default defineComponent({
  name: 'CartItem',
  components: {CartItemInput},
  props: {
    item: {
      type: Object as PropType<IProduct>,
      default: () => ({})
    }
  },
  setup(props) {
    const {removeItem} = useCartStore()
    const {item} = toRefs(props)
    const {rate} = storeToRefs(useCatalogStore())
    const qty = ref(1)
    const price = computed(() => priceToFixed(item.value.price * rate.value))
    const totalPriceValue = computed(() => priceToFixed(price.value * item.value.addedQty))
    const priceClass = ref()

    watch(() => rate.value, (newV, oldV) => {
      priceClass.value = (newV > oldV ? 'cart-item__price--up' : 'cart-item__price--down')
    })


    return {
      removeItem,
      qty,
      alert,
      price,
      totalPriceValue,
      priceClass,
    }
  }
})
</script>

<style scoped lang="scss">
@import './styles/cart-item';
</style>
