import { User } from './user.type'
import { SuccessResponse } from './utils.type'

export type AuthResponse = SuccessResponse<{
  data: string
  expires: string
  user: User
  success: boolean
}>

export interface LoginResponse {
  token: string
  success: boolean // Example field to indicate success
  // Các trường thông tin khác nếu có
}
