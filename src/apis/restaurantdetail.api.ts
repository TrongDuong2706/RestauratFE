import { AxiosResponse } from 'axios'
import { GetRestaurantDetailResponse } from 'src/types/restaurantdetail.type'
import http from 'src/utils/http'

export const getRestaurantDetail = (id: number) => {
  return http.get<GetRestaurantDetailResponse>(`/restaurant/detail`, {
    params: { id } // Pass id as part of params object
  })
}
