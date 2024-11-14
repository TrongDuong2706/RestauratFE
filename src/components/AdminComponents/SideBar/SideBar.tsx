import React from 'react'
import { Link } from 'react-router-dom'

export default function SideBar() {
  return (
    <div className='w-64 bg-gray-800 text-white h-screen p-4'>
      <div className='text-xl font-bold mb-4'>COREUI PRO</div>
      <ul>
        <li className='mb-2'>
          <Link to='/admin' className='block py-2 px-4 rounded hover:bg-gray-700'>
            DashBoard
          </Link>
        </li>
        <li className='mb-2'>
          <Link to='/admin/food-list' className='block py-2 px-4 rounded hover:bg-gray-700'>
            Food Management
          </Link>
        </li>
        <li className='mb-2'>
          <a href='#' className='block py-2 px-4 rounded hover:bg-gray-700'>
            Settings
          </a>
        </li>
      </ul>
    </div>
  )
}
