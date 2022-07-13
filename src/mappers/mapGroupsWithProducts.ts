import groups from '../../public/names.json'
import {priceToFixed} from '@/helpers/priceToFixed'
import {IProduct} from '@/types/IProduct'
import {IGroup} from '@/types/IGroup'

interface IGroupsData {
  [key:string] : object,
}

interface IGroupData {
  G? : string,
  C?: string | number,
  B? : any // TODO
}

export const mapGroupsWithProducts = (goods: IProduct[]) => {
  const groupsData: IGroupsData = groups
  const filteredGroups: IGroup[] = []

  for (const i in groupsData) {
    const groupValues: IGroupData = groupsData[i]
    const groupProducts: [string, object][] = Object.entries(groupValues.B)

    const group: IGroup = {
      id: Number(i),
      name: groupValues.G,
      products: groupProducts.map(([productId, productData]) => {
        const targetProduct = goods.find(({id}) => id === Number(productId))

        return {
          id: Number(productId),
          title: productData.N,
          price: targetProduct ? priceToFixed(targetProduct.price) : 0,
          qty: targetProduct ? targetProduct.qty : 0,
          addedQty: 1,
        }
      })
    }

    filteredGroups.push(group)
  }

  return filteredGroups
}
