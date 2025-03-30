export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice: number
  image: string
  category: string
  isNew: boolean
  discount: number
  quantity: number
}

export interface CartItem extends Product {
  quantity: number
}

