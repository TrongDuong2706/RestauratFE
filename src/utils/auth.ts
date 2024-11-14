export const saveAccessTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const clearAccessTokenFromLS = () => {
  localStorage.removeItem('access_token')
}

export const getAccessTokenFromLS = (): string => {
  return localStorage.getItem('access_token') || ''
}

export const saveUserIDToLS = (userId: string) => {
  localStorage.setItem('userId', userId)
}

export const clearUserIDFromLS = () => {
  localStorage.removeItem('userId')
}

export const getUserIDFromLS = (): string => {
  return localStorage.getItem('userId') || ''
}

export const saveRestaurantIDToLS = (restaurantId: string) => {
  localStorage.setItem('restaurantId', restaurantId)
}

export const clearRestaurantIDFromLS = () => {
  localStorage.removeItem('restaurantId')
}

export const getRestaurantIDFromLS = () => {
  return localStorage.getItem('restaurantId') || ''
}

// Lưu roleId vào localStorage
export const saveRoleIdToLS = (roleId: string) => {
  localStorage.setItem('roleId', roleId)
}

// Xóa roleId từ localStorage
export const clearRoleIdFromLS = () => {
  localStorage.removeItem('roleId')
}

// Lấy roleId từ localStorage
export const getRoleIdFromLS = (): string => {
  return localStorage.getItem('roleId') || ''
}
