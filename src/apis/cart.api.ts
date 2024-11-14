import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import http from 'src/utils/http' // Adjust the path as necessary

export type CartItem = {
  foodId: number
  quantity: number
}

export type OrderItem = {
  orderId: number
  foodId: number
  quantity: number
  createDate: string // hoặc có thể sử dụng kiểu Date nếu muốn
}

export type OrderItemsResponse = {
  status: number
  desc: string
  data: OrderItem[]
  success: boolean
}

export const getOrderItems = async (orderId: number) => {
  try {
    const response = await http.get<OrderItemsResponse>(`/order/order-items/${orderId}`)
    console.log(response) // Log toàn bộ phản hồi
    return response.data
  } catch (error) {
    console.error('Error fetching order items:', error)
    throw error
  }
}

export const useOrderItems = (orderId: number) => {
  return useQuery({
    queryKey: ['orderItems', orderId],
    queryFn: () => getOrderItems(orderId)
  })
}

export type AddToCartRequest = {
  userId: number | string
  restaurantId: any
  foodItems: CartItem[]
}

export const addToCart = async (data: AddToCartRequest) => {
  try {
    const response = await http.post('/order/add-to-cart', data)
    return response.data
  } catch (error) {
    console.error('Error adding to cart:', error)
    throw error
  }
}

export const checkoutCart = async (orderId: number | string) => {
  try {
    const response = await http.post(`/order/checkoutCart/${orderId}`)
    return response.data
  } catch (error) {
    console.error('Error checking out cart:', error)
    throw error
  }
}
export const getOrderIdByUserId = async (userId: string) => {
  const response = await axios.get(`/cart/order-id/${userId}`)
  return response.data
}

//Đoạn này để thực hiện Call API lấy tất cả sản phẩm từ giỏ hàng
export type GetCartItem = {
  foodId: number
  avatar: string | null
  price: number
  foodName: string
  quantity: number
  createDate: string
}

export type CartDTO = {
  cartId: number
  userId: number
  items: GetCartItem[]
}

export const fetchCartByUserId = async (userId: number) => {
  const response = await http.get<CartDTO>(`/cart/${userId}`)
  return response.data
}
