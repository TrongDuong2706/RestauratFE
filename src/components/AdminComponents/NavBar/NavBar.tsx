import { useQuery } from '@tanstack/react-query'
import Tippy from '@tippyjs/react/headless'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { getOneUser } from 'src/apis/auth.api'
import Popper from 'src/components/Popper'
import UserProfile from 'src/components/UserProfile'
import { AppContext } from 'src/contexts/app.context'
import { getUserIDFromLS } from 'src/utils/auth'

export default function NavBar() {
  const { isAuthenticated } = useContext(AppContext)
  const baseURL = 'http://localhost:8080/user'

  const userId: any = getUserIDFromLS() // Bạn cần thay thế giá trị này bằng giá trị thực tế hoặc lấy từ context/props/etc.

  const { data, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getOneUser(userId)
  })
  return (
    <div className='flex justify-between items-center bg-white p-4 shadow'>
      <div>
        <a href='#' className='text-lg font-bold'>
          Home / Dashboard
        </a>
      </div>
      <div className='flex items-center'>
        {isAuthenticated ? (
          <Tippy
            interactive
            placement='bottom-end'
            render={(attrs) => (
              <div tabIndex={-1} {...attrs} className='z-50'>
                <Popper>
                  <UserProfile />
                </Popper>
              </div>
            )}
          >
            <button className='relative'>
              <img
                className='w-9 h-9 rounded-full object-cover'
                src={`${baseURL}/file/${data?.avatar}`}
                alt='User Profile'
              />
            </button>
          </Tippy>
        ) : (
          <div className='flex items-center space-x-4'>
            <Link to='/register'>Đăng ký</Link>
            <div className='border-r border-gray-400 h-6'></div>
            <Link to='/login'>Đăng Nhập</Link>
          </div>
        )}
      </div>
    </div>
  )
}
