import { defineStore } from 'pinia'
import { useCatalogStore } from '@/stores/catalog'
import {priceToFixed} from '@/helpers/priceToFixed'
import {IProduct} from '@/types/IProduct'

export type CartState = {
  cart: IProduct[];
};

export const useCartStore = defineStore({
  id: 'cart',
  state: () => ({
    cart: [],
  } as CartState),

  getters: {
    getCartItemsCount(state) {
      return state.cart.reduce((acc, cur) => acc + cur.addedQty, 0)
    },

    getCartTotalValue(state) {
      const {rate} = useCatalogStore()

      return priceToFixed(state.cart.reduce((acc, cur) => acc + (cur.price * rate * cur.addedQty), 0))
    },

    totalQty(state) {
      return state.cart.reduce((acc, cur) => acc + cur.addedQty, 0)
    }
  },
  actions: {
    addItemToCart(product: IProduct) {
      const productInCart = this.cart.find(el => el.id === Number(product.id))

      if (!productInCart) {
        this.cart.push(product)
        return
      }

      if (productInCart.addedQty === product.qty) {
        alert(`Вы превысили допустимое количество товара: ${product.title}`)
        return
      }

      productInCart.addedQty += productInCart.addedQty < product.qty ? 1 : product.qty
    },

    updateCartItemQty(payloadId: number, newQty: number) {
      this.cart.find(({id}) => id === payloadId)!.addedQty = newQty
    },

    removeItem(id: number) {
      const idx = this.cart.findIndex(el => el.id === id)
      this.cart.find(el => el.id === id)!.addedQty = 1
      this.cart.splice(idx, 1)
    },

    checkout() {
      alert(`Покупка ${this.totalQty} товаров(а)`)
    },
  }
})

