import { Category } from 'src/types/restaurantdetail.type'
import http from 'src/utils/http'

interface getCategoryResponse {
  status: number
  desc: string | null
  data: Category[]
  success: boolean
}
export const getAllCategory = () => http.get<getCategoryResponse>('/category/getAll')
