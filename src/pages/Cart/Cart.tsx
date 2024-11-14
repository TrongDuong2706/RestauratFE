// src/pages/Cart/Cart.tsx

import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'
import { toast } from 'react-toastify'
import { checkoutCart, fetchCartByUserId } from 'src/apis/cart.api'
import { getUserIDFromLS } from 'src/utils/auth'
import { v4 as uuidv4 } from 'uuid'

export default function Cart() {
  const userIdFromLocalStorage = getUserIDFromLS()
  const orderId = userIdFromLocalStorage
  const baseURL = 'http://localhost:8080/cart'

  const { data, isLoading, error } = useQuery({
    queryKey: ['items', orderId],
    queryFn: () => fetchCartByUserId(Number(orderId))
  })
  console.log(data)

  const checkoutMutation = useMutation({
    mutationFn: () => checkoutCart(orderId),
    onSuccess: () => {
      toast.success('Thanh toán giỏ hàng thành công!')
    },
    onError: () => {
      toast.error('Có lỗi xảy ra khi thanh toán giỏ hàng.')
    }
  })

  const handleCheckout = () => {
    checkoutMutation.mutate()
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Có lỗi xảy ra: {error.message}</div>
  }

  const totalPrice = data?.items.reduce((total, item) => total + item.price * item.quantity, 0) ?? 0

  return (
    <div className='container mx-auto mt-10'>
      <div className='flex shadow-md my-10'>
        <div className='w-full bg-white px-10 py-10'>
          <div className='flex justify-between border-b pb-8'>
            <h1 className='font-semibold text-2xl'>Giỏ hàng</h1>
          </div>
          <div className='flex mt-10 mb-5'>
            <h3 className='font-semibold text-gray-600 text-xs uppercase w-1/5'>Hình ảnh</h3>
            <h3 className='font-semibold text-gray-600 text-xs uppercase w-2/5'>Tên sản phẩm</h3>
            <h3 className='font-semibold text-gray-600 text-xs uppercase w-1/5 text-center'>Số lượng</h3>
            <h3 className='font-semibold text-gray-600 text-xs uppercase w-1/5 text-center'>Giá tiền</h3>
            <h3 className='font-semibold text-gray-600 text-xs uppercase w-1/5 text-center'>Xóa</h3>
          </div>

          {data?.items.map((item) => (
            <div className='flex items-center hover:bg-gray-100 -mx-8 px-6 py-5' key={uuidv4()}>
              <div className='flex w-1/5'>
                <div className='w-20'>
                  <img className='h-24 object-cover' src={`${baseURL}/file/${item.avatar}`} />
                </div>
              </div>
              <div className='flex flex-col justify-between ml-4 flex-grow w-2/5'>
                <span className='font-bold text-sm'>{item.foodName}</span>
              </div>
              <div className='flex justify-center w-1/5'>
                <input className='mx-2 border text-center w-8' type='text' value={item.quantity} readOnly />
              </div>
              <span className='text-center w-1/5 font-semibold text-sm text-red-500'>{item.price} ₫</span>
              <span className='text-center w-1/5 font-semibold text-sm'>X</span>
            </div>
          ))}

          <div className='flex justify-between items-center mt-10'>
            <button className='flex font-semibold text-sm text-indigo-600'>← TIẾP TỤC MUA SẮM</button>
            <div className='text-right'>
              <span className='font-semibold text-sm text-gray-600'>Tổng tiền : </span>
              <span className='font-semibold text-sm'>{totalPrice} ₫</span>
            </div>
            <button
              onClick={handleCheckout}
              className='bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-1/4'
            >
              THANH TOÁN
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
