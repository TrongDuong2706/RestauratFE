export interface Menu {
  id: number
  title: string
  image: string
  description: string | null
  price: number
  freeShip: boolean
  quantity: number
}

export interface Category {
  id: number
  name: string
  menus: Menu[]
}

export interface Restaurant {
  id: number
  image: string
  title: string
  rating: number
  subtitle: string
  openDate: string
  description: string
  totalItems: number
  category: Category[]
  freeShip: boolean
  address: string
}

export interface GetRestaurantDetailResponse {
  status: number
  desc: string | null
  data: Restaurant
  success: boolean
}
