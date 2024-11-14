import React, { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { createMenu } from 'src/apis/adminfood.api'
import { getAllCategory } from 'src/apis/admincategory.api'
import { toast } from 'react-toastify'

interface CreateMenuParams {
  file: File
  title: string
  is_freeship: boolean
  time_ship: string
  description: string
  price: number
  cate_id: number
  status: number // Đổi kiểu dữ liệu thành number
}

export default function AdminAddFood() {
  const [food, setFood] = useState({
    foodName: '',
    image: '',
    timeShip: '',
    price: '',
    category: '1',
    isFreeShip: false,
    description: '',
    status: 1 // Đổi kiểu dữ liệu thành number và đặt giá trị mặc định
  })

  const { data, error, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategory
  })

  const categories = data?.data.data

  const [file, setFile] = useState<File | null>(null)

  const mutation = useMutation<AxiosResponse, unknown, CreateMenuParams>({
    mutationFn: (newFood) => createMenu(newFood),
    onSuccess: (data) => {
      toast.success('Thêm food thành công!')
      console.log('Food added successfully:', data)
    },
    onError: (error) => {
      console.error('Error adding food:', error)
    }
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement
    if (type === 'file') {
      const file = files![0]
      setFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setFood({
          ...food,
          [name]: reader.result as string
        })
      }
      if (file) {
        reader.readAsDataURL(file)
      }
    } else {
      setFood({
        ...food,
        [name]: type === 'checkbox' ? checked : name === 'status' ? parseInt(value) : value
      })
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) {
      console.error('File is required')
      return
    }
    const newFood: CreateMenuParams = {
      file,
      title: food.foodName,
      is_freeship: food.isFreeShip,
      time_ship: food.timeShip,
      description: food.description,
      price: parseFloat(food.price),
      cate_id: parseInt(food.category),
      status: food.status // Trường status là number
    }
    mutation.mutate(newFood)
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h2 className='text-2xl font-bold mb-4'>Add New Food</h2>
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
                <option key={category.id} value={category.id}>
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
          <div className='mb-4 md:col-span-2'>
            <label className='block text-gray-700'>Status</label>
            <select
              name='status'
              value={food.status.toString()} // Chuyển đổi status thành string để hiển thị trong select
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
            <label htmlFor='image-upload' className='bg-blue-500 text-white px-4 py-2 rounded cursor-pointer'>
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
          Add Food
        </button>
      </form>
    </div>
  )
}
