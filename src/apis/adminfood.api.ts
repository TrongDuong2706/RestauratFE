import { AxiosResponse } from 'axios'
import { Food } from 'src/types/food.type'
import http from 'src/utils/http'

interface getFoodResponse {
  status: number
  desc: string | null
  data: Food[]
  success: boolean
  totalPages: number
  currentPage: number
}

export const getAllFood = (page: number, size: number, keyword?: string, status?: number, cateId?: number) => {
  return http.get<getFoodResponse>('/menu/getAll', {
    params: {
      page,
      size,
      keyword,
      status,
      cateId
    }
  })
}

//Phần add food

interface CreateMenuResponse {
  status: number
  desc: string | null
  data: any
  success: boolean
}

interface CreateMenuParams {
  file: File
  title: string
  is_freeship: boolean
  time_ship: string
  description: string
  price: number
  cate_id: number
  status: number // Đổi kiểu dữ liệu thành number
}

export const createMenu = (params: CreateMenuParams): Promise<AxiosResponse<CreateMenuResponse>> => {
  const formData = new FormData()
  formData.append('file', params.file)
  formData.append('title', params.title)
  formData.append('is_freeship', params.is_freeship.toString())
  formData.append('time_ship', params.time_ship)
  formData.append('description', params.description)
  formData.append('price', params.price.toString())
  formData.append('cate_id', params.cate_id.toString())
  formData.append('status', params.status.toString())
  formData.forEach((value, key) => {
    console.log(key, value)
  })

  return http.post<CreateMenuResponse>('/menu', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

//Phần hiển thị food theo id
export const getFoodById = (foodId: number) => {
  return http.get<CreateMenuResponse>(`/menu/${foodId}`, {
    params: { foodId } // Pass id as part of params object
  })
}
//Phần update

export interface UpdateMenuParams {
  foodId: number
  file?: File | null // Allow file to be null
  title: string
  is_freeship: boolean
  time_ship: string
  description: string
  price: number
  cate_id: number | string
  status: number // Thêm trường status
}

interface UpdateMenuResponse {
  status: number
  desc: string | null
  data: any
  success: boolean
}

export const updateMenu = (params: UpdateMenuParams): Promise<AxiosResponse<UpdateMenuResponse>> => {
  const formData = new FormData()
  if (params.file) {
    formData.append('file', params.file)
  }
  formData.append('title', params.title)
  formData.append('is_freeship', params.is_freeship.toString())
  formData.append('time_ship', params.time_ship)
  formData.append('description', params.description)
  formData.append('price', params.price.toString())
  formData.append('cate_id', params.cate_id.toString())
  formData.append('status', params.status.toString()) // Thêm trường status

  formData.forEach((value, key) => {
    console.log(key, value)
  })

  return http.post<UpdateMenuResponse>(`/menu/update/${params.foodId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

//API xóa mềm

interface SoftDeleteResponse {
  status: number
  desc: string | null
  data: any
  success: boolean
}

export const softDeleteMenu = (foodId: number): Promise<AxiosResponse<SoftDeleteResponse>> => {
  return http.delete<SoftDeleteResponse>(`/menu/delete/${foodId}`)
}
