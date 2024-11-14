import { useSearchParams } from 'react-router-dom'
import axios, { AxiosError, HttpStatusCode } from 'axios'

export const useQueryString = () => {
  const [searchParams] = useSearchParams()
  const searchParamsObject = Object.fromEntries([...searchParams])
  return searchParamsObject
}
export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): boolean {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}
