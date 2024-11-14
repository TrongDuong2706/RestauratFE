import React, { useContext } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

import { getOneUser, logout } from 'src/apis/auth.api'
import { AppContext } from 'src/contexts/app.context'
import { getUserIDFromLS } from 'src/utils/auth'

export default function UserProfile() {
  const { setIsAuthenticated, isAuthenticated } = useContext(AppContext)
  const userId: any = getUserIDFromLS() // Bạn cần thay thế giá trị này bằng giá trị thực tế hoặc lấy từ context/props/etc.
  const baseURL = 'http://localhost:8080/user'

  const {
    data: user,
    isLoading,
    error
  } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getOneUser(userId)
  })

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setIsAuthenticated(false)
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <div className='px-5 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
        <div className='flex justify-end px-4 pt-4'>
          <button
            id='dropdownButton'
            data-dropdown-toggle='dropdown'
            className='inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5'
            type='button'
          >
            <span className='sr-only'>Open dropdown</span>
          </button>

          <div
            id='dropdown'
            className='z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700'
          ></div>
        </div>
        <div className='flex flex-col items-center pb-10'>
          <img
            className='w-24 h-24 mb-3 rounded-full shadow-lg object-cover'
            src={`${baseURL}/file/${user?.avatar}`}
            alt={user?.fullname}
          />
          <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>{user?.fullname}</h5>
          <span className='text-sm text-gray-500 dark:text-gray-400'>{user?.username}</span>
          <div className='flex mt-4 md:mt-6'>
            <a
              href='#'
              className='inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Profile
            </a>
            <Link
              to='/login'
              onClick={handleLogout}
              className='py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
            >
              Logout
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
