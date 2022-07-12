import {IProduct} from '@/types/IProduct'

export interface IGroup {
  id: number,
  name: string | undefined,
  products: IProduct[],
}
