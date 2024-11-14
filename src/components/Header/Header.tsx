import React, { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { Link } from 'react-router-dom'
import Tippy from '@tippyjs/react/headless'
import Popper from '../Popper'
import UserProfile from '../UserProfile'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import FoodItemCart from '../FoodItemCart'
import { getUserIDFromLS } from 'src/utils/auth'
import { useQuery } from '@tanstack/react-query'
import { getOneUser } from 'src/apis/auth.api'

export default function Header() {
  const { isAuthenticated } = useContext(AppContext)

  const userId: any = getUserIDFromLS() // Bạn cần thay thế giá trị này bằng giá trị thực tế hoặc lấy từ context/props/etc.
  const baseURL = 'http://localhost:8080/user'

  const { data, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getOneUser(userId),
    enabled: !!userId && userId !== '0' // API will only be called when userId is valid
  })
  console.log(data)

  return (
    <div className='px-3 border-b-[1px]'>
      <div className='p-3 grid grid-cols-3 items-center'>
        <div className='flex items-center'>
          <p className='font-bold text-xs sm:text-sm md:text-base lg:text-sm'>102 - THÁI THỊNH - ĐỐNG ĐA - HÀ NỘI</p>
        </div>
        <div className='flex justify-center'>
          <img
            className='w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18'
            src='https://svgsilh.com/svg/2085075.svg'
            alt='Logo'
          />
        </div>
        <div className='flex items-center justify-end space-x-4 text-xs sm:text-sm md:text-base lg:text-lg'>
          <div className='relative'>
            <Tippy
              interactive
              placement='bottom-end'
              render={(attrs) => (
                <div tabIndex={-1} {...attrs} className='z-50'>
                  <Popper>
                    <FoodItemCart />
                  </Popper>
                </div>
              )}
            >
              <div className='cursor-pointer'>
                <Link to='/cart'>
                  <FontAwesomeIcon className='text-2xl' icon={faCartShopping} />
                </Link>
              </div>
            </Tippy>
          </div>
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
    </div>
  )
}
