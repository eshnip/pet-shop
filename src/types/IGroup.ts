import {IProduct} from '@/types/IProduct'

export interface IGroup {
  id: number | string,
  name: string,
  products: IProduct[],
}
