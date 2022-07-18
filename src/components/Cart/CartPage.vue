<template>
  <div class="cart">
    <div class="cart__wrapper">
      <div class="cart__title">
        Корзина
      </div>
      <form
        class="cart__form"
        @submit.prevent="checkoutCart"
      >
        <div class="cart__body">
          <ul
            v-if="cartLength"
            class="cart__list"
          >
            <CartItem
              v-for="item in cart"
              :key="item.id"
              :item="item"
              class="cart__item"
            />
          </ul>
          <div
            v-else
            class="cart__empty"
          >
            Пока что здесь пусто
          </div>
        </div>

        <div class="cart__total">
          <span>Кол-во товаров: {{ getCartItemsCount }} шт.</span>
          <span>Общая стоимость: {{ getCartTotalValue }} RUB</span>
        </div>

        <div class="cart__controls">
          <button
            :disabled="!cartLength"
            class="cart__btn cart__btn--danger"
            @click="clearCart"
          >
            Очистить корзину
          </button>
          <button
            :disabled="!cartLength"
            class="cart__btn"
            type="submit"
          >
            Оформить заказ
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import {useCartStore} from '@/stores/cart'
import CartItem from '@/components/Cart/CartItem.vue'
import {storeToRefs} from 'pinia'
import {computed} from '@vue/composition-api/dist/vue-composition-api'
import {defineComponent} from '@vue/composition-api'

export default defineComponent({
  name: 'CartPage',
  components: {CartItem},
  setup() {
    const cartStore = useCartStore()
    const {cart, getCartItemsCount, getCartTotalValue} = storeToRefs(useCartStore())

    const cartLength = computed(() => cart.value?.length)

    const clearCart = () => cartStore.$reset()

    const checkoutCart = () => {
      cartStore.checkout()
      clearCart()
    }

    return {
      cart,
      clearCart,
      checkoutCart,
      getCartItemsCount,
      getCartTotalValue,
      cartLength
    }
  }
})
</script>

<style scoped lang="scss">
@import './styles/cart-page';
</style>
