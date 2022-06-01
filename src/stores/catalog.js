import {defineStore} from 'pinia';
import {mapGroupsWithProducts} from '@/mappers/mapGroupsWithProducts'

export const useCatalogStore = defineStore({
  id: 'catalog',
  state: () => ({
    catalog: [],
    rate: 60,
  }),
  getters: {
    availableProducts(state) {
      return state.catalog.map(group => ({
        ...group,
        products: group.products.filter(({qty}) => qty > 0)
      }))
    }
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
});
