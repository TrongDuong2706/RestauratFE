import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getRestaurant } from 'src/apis/restaurant.api'
import { Restaurant } from 'src/types/restaurant.type'

export default function ListRestaurant() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['restaurants'],
    queryFn: getRestaurant
  })

  console.log('Data from API:', data) // Kiểm tra dữ liệu trả về

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error loading restaurants</div>
  }

  // Truy cập đúng vào mảng nhà hàng từ thuộc tính `data`
  const restaurants = data?.data.data || []
  const baseURL = 'http://localhost:8080/restaurant'

  return (
    <div className='max-w-5xl mx-auto'>
      <div className='grid grid-cols-4 gap-[30px]'>
        {restaurants.map((restaurant: Restaurant) => (
          <div key={restaurant.id} className='bg-white shadow-xl p-5 rounded-xl'>
            <div>
              <img
                className='w-full h-full object-cover rounded-xl'
                src={`${baseURL}/file/${restaurant.image}`}
                alt={restaurant.title}
              />
              <h3 className='mt-[10px] font-bold'>{restaurant.title}</h3>
              <h3 className='font-light text-xs my-2'>{restaurant.subtitle}</h3>
            </div>
            <div className='flex justify-between'>
              <div className='text-[14px]'>Rating:</div>
              <div className='text-[14px]'>{restaurant.rating}</div>
            </div>
            <div className='flex justify-between'>
              <div className='text-[14px] font-bold text-red-400'>
                {restaurant.freeShip ? 'Free Shipping' : 'No Free Shipping'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
