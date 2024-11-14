import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchCartByUserId } from 'src/apis/cart.api'
import { getUserIDFromLS } from 'src/utils/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHashtag } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export default function FoodItemCart() {
  const userId = getUserIDFromLS()
  const baseURL = 'http://localhost:8080/cart'

  const { data, isLoading, error } = useQuery({
    queryKey: ['items', userId],
    queryFn: () => fetchCartByUserId(Number(userId)),
    enabled: !!userId
  })

  console.log('Order items data:', data) // Log order items data

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }
  const totalItems = data?.items?.reduce((total, item) => total + item.quantity, 0) || 0

  return (
    <div className='p-4 bg-white shadow-lg rounded-lg w-80'>
      <h2 className='text-gray-500 text-sm mb-2'>Sản Phẩm Mới Thêm</h2>
      {data &&
        data.items &&
        data.items.map((item) => (
          <div key={item.foodId} className='flex items-center border-b py-2 hover:bg-gray-100'>
            <img src={`${baseURL}/file/${item.avatar}`} alt='' className='w-12 h-12 object-cover rounded mr-4' />
            <div className='flex-1'>
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium text-gray-800'>{item.foodName}</span>
                <div className='text-black-500 '>{item.quantity}</div>
              </div>
            </div>
          </div>
        ))}
      <div className='flex justify-between items-center mt-4'>
        <span className='text-xs text-gray-500'>{totalItems} sản phẩm trong giỏ hàng</span>
        <Link to='/cart'>
          <button className='bg-orange-500 text-white text-xs px-4 py-2 rounded'>Xem Giỏ Hàng</button>
        </Link>
      </div>
    </div>
  )
}
