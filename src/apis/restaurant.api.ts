import { AxiosResponse } from 'axios'
import { Restaurant } from 'src/types/restaurant.type'
import http from 'src/utils/http'

interface GetRestaurantResponse {
  status: number
  desc: string | null
  data: Restaurant[]
  success: boolean
  totalPages: number
  currentPage: number
  totalItems: number
}

export const getRestaurant = (): Promise<AxiosResponse<GetRestaurantResponse>> => {
  return http.get<GetRestaurantResponse>('/restaurant')
}

export const getRestaurantPage = (page: number, size: number) => {
  return http.get<GetRestaurantResponse>('/restaurant', {
    params: {
      page,
      size
    }
  })
}


