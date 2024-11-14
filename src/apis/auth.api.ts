import { AxiosResponse } from 'axios'
import { AuthResponse } from 'src/types/auth.type'
import { User } from 'src/types/user.type'
import http from 'src/utils/http'

export const registerAccount = (body: { email: string; password: string; fullname: string }) =>
  http.post<AuthResponse>('/login/signup', body)

export const loginAccount = (body: FormData): Promise<AxiosResponse<AuthResponse>> => {
  return http.post<AuthResponse>('/login/signin', body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export const logout = () => http.post('/login/logout')
export const getOneUser = async (userId: string): Promise<User> => {
  // Thay thế URL bằng endpoint thực tế của bạn
  const { data } = await http.get(`/user/${userId}`)
  return data
}
