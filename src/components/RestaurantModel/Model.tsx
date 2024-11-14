import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { Menu } from 'src/types/restaurantdetail.type' // Adjust the import path as necessary
import { addToCart, AddToCartRequest } from 'src/apis/cart.api' // Adjust the import path as necessary
import { getRestaurantIDFromLS, getUserIDFromLS } from 'src/utils/auth'

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  product: Menu | null
}

const baseURL = 'http://localhost:8080/restaurant' // Adjust baseURL as necessary

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, product }) => {
  const [quantity, setQuantity] = useState(1)
  const queryClient = useQueryClient() // Thêm dòng này

  const mutation = useMutation({
    mutationKey: ['addToCart'],
    mutationFn: addToCart,
    onSuccess: () => {
      toast.success('Thêm sản phẩm vào giỏ hàng thành công!')
      queryClient.invalidateQueries({ queryKey: ['items', getUserIDFromLS()] }) // Invalidate query sau khi thêm thành công
      onClose() // Đóng modal sau khi thêm thành công
    },
    onError: (error: any) => {
      toast.error(`Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng: ${error.message}`)
    }
  })

  if (!isOpen || !product) return null

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10)
    if (value > 0) {
      setQuantity(value)
    }
  }

  const userIdFromLocalStorage = getUserIDFromLS()
  const restaurantIdFromLocalStorage = getRestaurantIDFromLS()

  const handleAddToCart = () => {
    const userId = userIdFromLocalStorage
    const restaurantId = restaurantIdFromLocalStorage // Giả định restaurantId
    const foodItems = [{ foodId: product.id, quantity }]
    console.log(userId)

    const requestData: AddToCartRequest = {
      userId,
      restaurantId,
      foodItems
    }
    mutation.mutate(requestData)
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='absolute inset-0 bg-gray-900 opacity-50'></div>
      <div className='bg-white p-6 rounded-lg z-50'>
        <h2 className='text-xl font-bold mb-4'>{product.title}</h2>
        <img
          src={`${baseURL}/file/${product.image}`}
          alt={product.title}
          className='w-full h-48 object-cover rounded-lg mb-4'
        />
        <p className='text-gray-700 mb-2'>{product.description}</p>
        <p className='text-red-600 font-bold mb-4'>${product.price}</p>
        <div className='flex items-center mb-4'>
          <label htmlFor='quantity' className='mr-2'>
            Số lượng:
          </label>
          <input
            type='number'
            id='quantity'
            value={quantity}
            onChange={handleQuantityChange}
            className='w-16 p-2 border rounded'
            min='1'
          />
        </div>
        <div className='flex justify-between'>
          <button
            onClick={onClose}
            className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          >
            Đóng
          </button>
          <button
            onClick={handleAddToCart}
            className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductModal
