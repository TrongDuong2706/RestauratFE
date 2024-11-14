import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { getAllCategory } from 'src/apis/admincategory.api'

export default function Search() {
  const navigate = useNavigate()

  const { data, error, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategory
  })

  const categories = data?.data.data

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const query = {
      keyword: (formData.get('keyword') ?? '') as string,
      status: (formData.get('status') ?? '') as string,
      cateId: (formData.get('cateId') ?? '') as string
    }

    // Xây dựng URL query string
    const queryString = new URLSearchParams(query).toString()
    navigate(`?${queryString}`)
  }

  return (
    <form className='flex items-center space-x-4 mb-4' onSubmit={handleSearch}>
      <div>
        <label htmlFor='status' className='sr-only'>
          Status
        </label>
        <select
          name='status'
          id='status'
          className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
        >
          <option value=''>All Status</option>
          <option value='1'>Active</option>
          <option value='0'>Inactive</option>
        </select>
      </div>

      <div>
        <label htmlFor='cateId' className='sr-only'>
          Category
        </label>
        <select
          name='cateId'
          id='cateId'
          className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
        >
          <option value=''>All Categories</option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor='keyword' className='sr-only'>
          Keyword
        </label>
        <input
          type='text'
          name='keyword'
          id='keyword'
          placeholder='Keyword'
          className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
        />
      </div>

      <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-lg'>
        Search
      </button>
    </form>
  )
}
