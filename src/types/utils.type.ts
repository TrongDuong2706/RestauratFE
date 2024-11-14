export interface ErrorResponse<Data> {
  data?: Data
  message: string
}

export interface SuccessResponse<Data> {
  data: Data
  message: string
}
