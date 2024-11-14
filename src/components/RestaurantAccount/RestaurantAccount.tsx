import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Link } from 'react-router-dom'
import { getRestaurant } from 'src/apis/restaurant.api'
import { clearRestaurantIDFromLS, saveRestaurantIDToLS } from 'src/utils/auth'

interface RestaurantAccountProps {
  searchQuery: string
}

export default function RestaurantAccount({ searchQuery }: RestaurantAccountProps) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['restaurants'],
    queryFn: getRestaurant
  })

  console.log('Data from API:', data)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error loading restaurants</div>
  }

  const restaurants = data?.data.data || []
  const baseURL = 'http://localhost:8080/restaurant'

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className='p-4 bg-white shadow-md rounded-lg w-[450px]'>
      <h2 className='text-xl font-bold mb-4'>Restaurants</h2>
      <ul>
        {filteredRestaurants.map((restaurant) => (
          <Link to={`/product/${restaurant.id}`} key={restaurant.id}>
            <li className='flex items-center mb-4'>
              <img
                src={`${baseURL}/file/${restaurant.image}`}
                alt={restaurant.title}
                className='w-12 h-12 rounded-full mr-4'
              />
              <div>
                <h3 className='text-lg font-semibold'>{restaurant.title}</h3>
                <p className='text-gray-500'>{restaurant.subtitle}</p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}
