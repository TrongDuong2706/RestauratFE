import React, { useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { getAllCategory } from 'src/apis/admincategory.api'
import { getAllFood, softDeleteMenu } from 'src/apis/adminfood.api'
import Search from 'src/components/AdminComponents/Search'
import { useQueryString } from 'src/utils/utils'
import { toast } from 'react-toastify'

export default function AdminListFood() {
  const queryString = new URLSearchParams(location.search)
  const page = Number(queryString.get('page')) || 1
  const baseURL = 'http://localhost:8080/menu'
  const size = 5
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const keyword = queryString.get('keyword') || ''
  const status = queryString.get('status') ? Number(queryString.get('status')) : undefined
  const cateId = queryString.get('cateId') ? Number(queryString.get('cateId')) : undefined

  const { data, isLoading, error } = useQuery({
    queryKey: ['foods', page, keyword, status, cateId],
    queryFn: () => getAllFood(page, size, keyword, status, cateId)
  })

  const softDeleteMutation = useMutation({
    mutationFn: (foodId: number) => softDeleteMenu(foodId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['foods', page, keyword, status, cateId] })
      toast('Xóa sản phẩm thành công')
    }
  })

  const allFoods = data?.data.data || []
  const filteredFoods = allFoods.filter((food) => food.status === 1)

  // Ensure there are 5 items per page, adding inactive items if necessary
  const foods =
    filteredFoods.length < size
      ? [...filteredFoods, ...allFoods.filter((food) => food.status === 0).slice(0, size - filteredFoods.length)]
      : filteredFoods

  const totalItems = allFoods[0]?.totalItems || 0
  const totalPages = Math.ceil(totalItems / size)
  const currentPage = page

  useEffect(() => {
    if (filteredFoods.length === 0 && currentPage > 1) {
      const newQueryString = new URLSearchParams(location.search)
      newQueryString.set('page', (currentPage - 1).toString())
      navigate(`?${newQueryString.toString()}`)
    }
  }, [filteredFoods, currentPage, navigate])

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      const newQueryString = new URLSearchParams(location.search)
      newQueryString.set('page', newPage.toString())
      navigate(`?${newQueryString.toString()}`)
    }
  }

  const handleDelete = (foodId: number) => {
    softDeleteMutation.mutate(foodId)
  }

  if (isLoading) {
    return <div className='flex items-center justify-center h-screen text-2xl text-gray-600'>Loading...</div>
  }

  if (error) {
    return <div className='flex items-center justify-center h-screen text-2xl text-red-600'>Error loading data</div>
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <Search />

      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-2xl font-bold'>Food List</h2>
        <Link to='/admin/add-food'>
          <button className='bg-green-500 text-white px-4 py-2 rounded'>Add New Food</button>
        </Link>
      </div>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-200'>
          <thead>
            <tr>
              <th className='border-b-2 border-gray-200 px-4 py-2 text-left'>Id</th>
              <th className='border-b-2 border-gray-200 px-4 py-2 text-left'>FoodName</th>
              <th className='border-b-2 border-gray-200 px-4 py-2 text-left'>Image</th>
              <th className='border-b-2 border-gray-200 px-4 py-2 text-left'>Time Ship</th>
              <th className='border-b-2 border-gray-200 px-4 py-2 text-left'>Price</th>
              <th className='border-b-2 border-gray-200 px-4 py-2 text-left'>Category</th>
              <th className='border-b-2 border-gray-200 px-4 py-2 text-left'>IsFreeShip</th>
              <th className='border-b-2 border-gray-200 px-4 py-2 text-left'>Description</th>
              <th className='border-b-2 border-gray-200 px-4 py-2 text-left'>Status</th>
              <th className='border-b-2 border-gray-200 px-4 py-2 text-left'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food) => (
              <tr key={food.id}>
                <td className='border-b border-gray-200 px-4 py-2'>{food.id}</td>
                <td className='border-b border-gray-200 px-4 py-2'>{food.title}</td>
                <td className='border-b border-gray-200 px-4 py-2'>
                  <img src={`${baseURL}/file/${food.image}`} alt={food.title} className='w-12 h-12 object-cover' />
                </td>
                <td className='border-b border-gray-200 px-4 py-2'>{food.timeShip}</td>
                <td className='border-b border-gray-200 px-4 py-2'>{food.price}</td>
                <td className='border-b border-gray-200 px-4 py-2'>{food.category}</td>
                <td className='border-b border-gray-200 px-4 py-2'>{food.freeShip ? 'Yes' : 'No'}</td>
                <td className='border-b border-gray-200 px-4 py-2'>{food.description}</td>
                <td className='border-b border-gray-200 px-4 py-2'>{food.status}</td>
                <td className='border-b border-gray-200 px-4 py-2'>
                  <Link to={`/admin/edit-food/${food.id}`}>
                    <button className='bg-blue-500 text-white px-2 py-1 rounded mr-2'>Edit</button>
                  </Link>
                  <button className='bg-red-500 text-white px-2 py-1 rounded' onClick={() => handleDelete(food.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className='flex justify-center mt-8'>
        <nav aria-label='Page navigation'>
          <ul className='flex space-x-4'>
            <li>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg text-gray-600 ${
                  currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }).map((_, index) => (
              <li key={index}>
                <button
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 rounded-lg text-gray-600 ${
                    currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg text-gray-600 ${
                  currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
