import { defineStore } from 'pinia';
import { useCatalogStore } from '@/stores/catalog'
import {priceToFixed} from "@/helpers/priceToFixed";

export const useCartStore = defineStore({
  id: 'cart',
  state: () => ({
    cart: [],
  }),
  getters: {
    getCartItemsCount(state) {
      return state.cart.reduce((acc, cur) => acc + cur.addedQty, 0)
    },

    getCartTotalValue(state) {
      const {rate} = useCatalogStore()

      return priceToFixed(state.cart.reduce((acc, cur) => acc + (cur.price * rate * cur.addedQty), 0))
    },
  },
  actions: {
    addItemToCart(product) {
      const cartItem = this.cart.find(el => el.id === Number(product.id))

      if (!cartItem) {
        this.cart.push(product)
        return
      }

      if (cartItem.addedQty === product.qty) {
        alert(`Вы превысили допустимое количество товара: ${product.title}`)
        return
      }

      cartItem.addedQty += cartItem.addedQty < product.qty ? 1 : product.qty
    },

    updateCartItem(id, newQty) {
      this.cart.find(el => el.id === id).addedQty = newQty
    },

    removeItem(id) {
      const idx = this.cart.findIndex(el => el.id === id)
      this.cart.find(el => el.id === id).addedQty = 1
      this.cart.splice(idx, 1)
    },

    clearCart() {
      this.cart = []
    },

    checkout() {
      const totalQty = this.cart.reduce((acc, cur) => acc + cur.addedQty, 0)
      alert(`Покупка ${totalQty} товаров(а)`);
      this.clearCart()
    },
  }
});

