import {defineStore} from 'pinia'
import {mapGroupsWithProducts} from '@/mappers/mapGroupsWithProducts'
import {IGroup} from '@/types/IGroup'
import {IProduct} from '@/types/IProduct'

export const useCatalogStore = defineStore({
  id: 'catalog',
  state: () => ({
    catalog: [],
    rate: 60,
  }),
  getters: {
    availableProducts(state) {
      return state.catalog.map(group  => ({
        ...(group as IGroup),
        products: group.products.filter(({qty}) => qty > 0)
      }))
    },
    catalogSortedPriceToDown(state) {
      return state.catalog.map(group => ({
        ...(group as IGroup),
        products: [...group.products].sort((a,b) => b.price - a.price)
      }))
    },
    catalogSortedPriceToUp(state) {
        return state.catalog.map(group => ({
          ...(group as IGroup),
          products: [...group.products].sort((a,b) => a.price - b.price)
      }))
    },
  },
  actions: {
    async fetchProductsData() {
      try {
        const response = await fetch('data.json')
        const data = await response.json()
        return data.Value.Goods.map((product) => ({
          id: Number(product.T),
          price: product.C,
          groupId: product.G,
          qty: product.P,
        }))
      } catch (e) {
        console.error(e)
      }
    },

    async saveProductsToState() {
      const products = await this.fetchProductsData()
      this.catalog = mapGroupsWithProducts(products)
    },
  }
})
