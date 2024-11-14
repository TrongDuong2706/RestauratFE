import React from 'react'
import Dashboard from 'src/components/AdminComponents/DashBoard/DashBoard'
import Navbar from 'src/components/AdminComponents/NavBar/NavBar'
import Sidebar from 'src/components/AdminComponents/SideBar/SideBar'

interface Props {
  children?: React.ReactNode
}

export default function DashBoardLayout({ children }: Props) {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1'>{children}</div>
    </div>
  )
}
