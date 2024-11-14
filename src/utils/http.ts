import axios, { AxiosError, AxiosInstance } from 'axios'
import { HttpStatusCode } from 'axios'
import { toast } from 'react-toastify'
import {
  clearAccessTokenFromLS,
  clearRoleIdFromLS,
  clearUserIDFromLS,
  getAccessTokenFromLS,
  saveAccessTokenToLS,
  saveRoleIdToLS,
  saveUserIDToLS
} from './auth'

class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: 'http://localhost:8080/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === '/login/signin') {
          const { data: token, userId, roleId } = response.data
          this.accessToken = 'Bearer ' + token
          saveAccessTokenToLS(this.accessToken)
          saveUserIDToLS(userId.toString()) // Lưu userID vào localStorage
          saveRoleIdToLS(roleId.toString())
        } else if (url === '/login/logout') {
          this.accessToken = ''
          clearAccessTokenFromLS()
          clearUserIDFromLS() // Xóa userID khỏi localStorage khi logout
          clearRoleIdFromLS()
        }

        return response
      },
      (error: AxiosError) => {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message

          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
