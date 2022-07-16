import { defineStore } from 'pinia'
import { useCatalogStore } from '@/stores/catalog'
import {priceToFixed} from '@/helpers/priceToFixed'
import {IProduct} from '@/types/IProduct'

type CartState = {
  cart: IProduct[]
};

export const useCartStore = defineStore({
  id: 'cart',
  state: () => ({
    cart: [] ,
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
      const cartProduct = this.cart.find(el => el.id === product.id)

      if (!cartProduct) {
        this.cart.push(product)
        return
      }

      if (cartProduct.addedQty === product.qty) {
        alert(`Вы превысили допустимое количество товара: ${product.title}`)
        return
      }

      cartProduct.addedQty += cartProduct.addedQty < product.qty ? 1 : product.qty
    },

    updateCartItemQty(payloadId: number, newQty: number) {
      const cartProduct =  this.cart.find(el => el.id === payloadId)

      if (cartProduct) cartProduct.addedQty = newQty
    },

    removeItem(payloadId: number) {
      const targetProduct = this.cart.find(el => el.id === payloadId)
      const idx = this.cart.findIndex(el => el.id === payloadId)

      if (targetProduct) targetProduct.addedQty = 1
      this.cart.splice(idx, 1)
    },

    checkout() {
      alert(`Покупка ${this.totalQty} товаров(а)`)
    },
  }
})

