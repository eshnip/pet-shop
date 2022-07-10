import * as groups from '../../public/names.json'
import {priceToFixed} from '@/helpers/priceToFixed'
import {IProduct} from '@/types/IProduct'
import {IGroup} from '@/types/IGroup'

export const mapGroupsWithProducts = (goods: IProduct[]) => {
  return Object.entries(groups).map(([groupId, products]) => {
    const productsInGroup = Object.entries(products.B)

    const filteredProducts = productsInGroup.map(([productId, productData]) => {
        const targetProduct = goods.find(({id}) => id === Number(productId))

        return {
          id: Number(productId),
          title: productData.N,
          price: targetProduct ? priceToFixed(targetProduct.price) : 0,
          qty: targetProduct ? targetProduct.qty : 0,
          addedQty: 1,
        }
      }
    )

    return {
      id: groupId,
      name: products.G,
      products: filteredProducts,
    }
  })
}
