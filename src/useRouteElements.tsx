import React, { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Cart from './pages/Cart'
import ProductList from './pages/ProductList'
import DefaultLayout from './layouts/DefaultLayout'
import Profile from './pages/Profile'
import { AppContext } from './contexts/app.context'
import DetailRestaurant from './pages/DetailRestaurant'
import DashBoardLayout from './layouts/DashBoardLayout'
import AdminDashBoard from './pages/Admin/AdminDashboard'
import AdminAddFood from './pages/Admin/AdminFood/AdminAddFood'
import AdminListFood from './pages/Admin/AdminFood/AdminListFood/AdminListFood'
import AdminEditFood from './pages/Admin/AdminFood/AdminEditFood'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)

  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}
export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      index: true,
      element: (
        <DefaultLayout>
          <Home />
        </DefaultLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/profile',
          element: (
            <DefaultLayout>
              <Profile />
            </DefaultLayout>
          )
        }
      ]
    },

    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '/register',
          element: <Register />
        },
        {
          path: '/login',
          element: <Login />
        }
      ]
    },

    {
      path: '/cart',
      element: (
        <DefaultLayout>
          <Cart />
        </DefaultLayout>
      )
    },
    {
      path: '/productlist',
      element: (
        <DefaultLayout>
          <ProductList />
        </DefaultLayout>
      )
    },
    {
      path: '/product/:id',
      element: (
        <DefaultLayout>
          <DetailRestaurant />
        </DefaultLayout>
      )
    },
    {
      path: 'admin',
      element: (
        <DashBoardLayout>
          <AdminDashBoard />
        </DashBoardLayout>
      )
    },
    {
      path: 'admin/food-list',
      element: (
        <DashBoardLayout>
          <AdminListFood />
        </DashBoardLayout>
      )
    },
    {
      path: 'admin/add-food',
      element: (
        <DashBoardLayout>
          <AdminAddFood />
        </DashBoardLayout>
      )
    },
    {
      path: 'admin/edit-food/:foodId',
      element: (
        <DashBoardLayout>
          <AdminEditFood />
        </DashBoardLayout>
      )
    }
  ])
  return routeElements
}
