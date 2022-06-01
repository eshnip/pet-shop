<template>
  <div class="cart">
    <div class="cart__wrapper">
      <div class="cart__title">Корзина</div>

      <form class="cart__form" @submit.prevent="checkout">
        <div class="cart__body">
          <ul class="cart__list" v-if="cartLength">
            <CartItem
                v-for="item in cart"
                :item="item"
                :key="item.id"
                class="cart__item"
            />
          </ul>
          <div class="cart__empty" v-else>Пока что здесь пусто</div>
        </div>

        <div class="cart__total">
          <span>Кол-во товаров: {{ getCartItemsCount }} шт.</span>
          <span>Общая стоимость: {{ getCartTotalValue }} RUB</span>
        </div>

        <div class="cart__controls">
          <button :disabled="!cartLength" class="cart__btn cart__btn--danger" @click="clearCart">Очистить корзину
          </button>
          <button :disabled="!cartLength" class="cart__btn" type="submit">Оформить заказ</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {useCartStore} from '@/stores/cart'
import CartItem from '@/components/Cart/CartItem'
import {storeToRefs} from 'pinia'
import {computed} from '@vue/composition-api/dist/vue-composition-api'

export default {
  name: 'CartPage',
  components: {CartItem},
  setup() {
    const {cart, getCartItemsCount, getCartTotalValue, clearCart, checkout} = storeToRefs(useCartStore())

    const cartLength = computed(() => cart.value?.length)

    return {
      cart,
      clearCart,
      checkout,
      getCartItemsCount,
      getCartTotalValue,
      cartLength
    }
  }
}

</script>

<style scoped lang="scss">
@import './styles/cart-page';
</style>
