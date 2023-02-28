import { BaseModel } from '../base/base.model'

export type Attributes = {
  description: string | null
  shape: string | null
  hardiness: string | null
  taste: string | null
}

export type Avocado = BaseModel & {
  id: string
  name: string
  sku: string
  image: string
  price: number
  attributes: Attributes
}
