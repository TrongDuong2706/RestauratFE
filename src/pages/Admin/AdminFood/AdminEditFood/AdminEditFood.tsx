import axios, { AxiosResponse } from 'axios'
import { useQuery, useMutation } from '@tanstack/react-query'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getAllCategory } from 'src/apis/admincategory.api'
import { UpdateMenuParams, getFoodById, updateMenu } from 'src/apis/adminfood.api'
import { toast } from 'react-toastify'

interface createFoodParam {
  id: string
  foodName: string
  image: string
  timeShip: string
  price: string
  category: string
  isFreeShip: boolean
  description: string
  categoryId: string
  status: number // Thêm trường status
}

export default function AdminEditFood() {
  const { foodId } = useParams<{ foodId: string }>()
  const [food, setFood] = useState<createFoodParam>({
    id: '',
    foodName: '',
    image: '',
    timeShip: '',
    price: '',
    category: '',
    isFreeShip: false,
    description: '',
    categoryId: '',
    status: 1 // Thêm trường status với giá trị mặc định
  })
  const [file, setFile] = useState<File | null>(null)

  const {
    data: foodData,
    error: foodError,
    isLoading: foodLoading
  } = useQuery({
    queryKey: ['food', foodId],
    queryFn: () => getFoodById(Number(foodId)),
    enabled: !!foodId
  })

  useEffect(() => {
    if (foodData) {
      console.log('foodData:', foodData)
      const fetchedFood: createFoodParam = {
        id: foodData.data.data.id,
        foodName: foodData.data.data.title || '',
        image: foodData.data.data.image || '',
        timeShip: foodData.data.data.timeShip || '',
        price: foodData.data.data.price || '',
        categoryId: foodData.data.data.cate_id,
        isFreeShip: foodData.data.data.is_freeship || false,
        description: foodData.data.data.description || '',
        category: foodData.data.data.categoryId,
        status: foodData.data.data.status || 1 // Thêm giá trị status từ dữ liệu fetched
      }
      setFood(fetchedFood)
    }
  }, [foodData])

  const { data, error, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategory
  })

  const categories = data?.data.data

  const mutation = useMutation({
    mutationFn: (params: UpdateMenuParams) => updateMenu(params),
    onSuccess: (data) => {
      toast.success('Chỉnh sửa thành công!')
      console.log('Update successful:', data)
    },
    onError: (error) => {
      console.error('Update failed:', error)
    }
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement
    if (type === 'file' && files) {
      const file = files[0]
      setFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setFood((prevFood) => ({
          ...prevFood,
          image: reader.result as string
        }))
      }
      if (file) {
        reader.readAsDataURL(file)
      }
    } else {
      setFood((prevFood) => ({
        ...prevFood,
        [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) : value
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const params: UpdateMenuParams = {
      foodId: Number(food.id),
      title: food.foodName,
      is_freeship: food.isFreeShip,
      time_ship: food.timeShip,
      description: food.description,
      price: Number(food.price),
      cate_id: Number(food.category),
      status: food.status, // Thêm trường status
      file: file
    }
    mutation.mutate(params)
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h2 className='text-2xl font-bold mb-4'>Edit Food</h2>
      <form onSubmit={handleSubmit} className='bg-white p-6 rounded shadow-md'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='mb-4'>
            <label className='block text-gray-700'>Food Name</label>
            <input
              type='text'
              name='foodName'
              value={food.foodName}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Time Ship</label>
            <input
              type='text'
              name='timeShip'
              value={food.timeShip}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Price</label>
            <input
              type='text'
              name='price'
              value={food.price}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Category</label>
            <select
              name='category'
              value={food.category}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded'
            >
              {categories?.map((category) => (
                <option key={category.id} value={category.id.toString()}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className='mb-4 md:col-span-2'>
            <label className='block text-gray-700'>Description</label>
            <textarea
              name='description'
              value={food.description}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded'
            ></textarea>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Status</label>
            <select
              name='status'
              value={food.status.toString()}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded'
            >
              <option value='1'>Available</option>
              <option value='0'>Unavailable</option>
            </select>
          </div>
          <div className='mb-4 flex items-center md:col-span-2'>
            <input
              type='checkbox'
              name='isFreeShip'
              checked={food.isFreeShip}
              onChange={handleChange}
              className='mr-2 leading-tight'
            />
            <label className='text-gray-700 mr-4'>Is Free Ship</label>
            <input type='file' name='image' onChange={handleChange} className='hidden' id='image-upload' />
            <label htmlFor='image-upload' className='bg-gray-500 text-white px-4 py-2 rounded cursor-pointer'>
              Choose File
            </label>
          </div>
          {food.image && (
            <div className='mb-4 md:col-span-2'>
              <img src={food.image} alt='Food' className='h-32 w-32 object-cover' />
            </div>
          )}
        </div>
        <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>
          Update Food
        </button>
      </form>
    </div>
  )
}
