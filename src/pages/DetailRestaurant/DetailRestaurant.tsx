import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getRestaurantDetail } from 'src/apis/restaurantdetail.api'
import ProductModal from 'src/components/RestaurantModel/Model'
import { Menu, Restaurant } from 'src/types/restaurantdetail.type'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruck, faStar, faUser, faMapMarkerAlt, faCalendarAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import ElementDetailRestaurant from 'src/components/ElementDetailRestaurant'

export default function DetailRestaurant() {
  const { id } = useParams()
  const baseURL = 'http://localhost:8080/restaurant'
  const [selectedProduct, setSelectedProduct] = useState<Menu | null>(null)
  const [filters, setFilters] = useState({
    name: '',
    sortByPrice: '' // 'asc' for ascending, 'desc' for descending
  })

  const { data, isLoading, error } = useQuery({
    queryKey: ['restaurants_detail', id],
    queryFn: () => getRestaurantDetail(Number(id))
  })

  if (isLoading) {
    return <div className='text-center mt-8'>Loading...</div>
  }

  if (error) {
    return <div className='text-center mt-8 text-red-500'>Error loading data</div>
  }

  const openProductModal = (product: Menu) => {
    setSelectedProduct(product)
  }

  const closeProductModal = () => {
    setSelectedProduct(null)
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }))
  }

  const filteredMenus = (menus: Menu[]) =>
    menus
      .filter((menu) => (filters.name ? menu.title.toLowerCase().includes(filters.name.toLowerCase()) : true))
      .sort((menuA, menuB) => {
        if (filters.sortByPrice === 'asc') {
          return menuA.price - menuB.price
        } else if (filters.sortByPrice === 'desc') {
          return menuB.price - menuA.price
        } else {
          return 0
        }
      })

  const restaurant: Restaurant | undefined = data?.data.data

  return (
    <div className='container mx-auto mt-5'>
      {/* Container for Filter Form, Slider and Restaurant Info */}
      <div className='flex flex-col items-center'>
        {/* Hình ảnh slider */}
        <div className='w-full mb-6'>
          <img
            src='https://www.currytime.co.nz/image/cache/catalog/slider/slide2_new-1915x921.png'
            alt=''
            className='w-full h-80 object-cover'
          />
        </div>

        {/* Thông tin nhà hàng */}
        <div className='bg-white p-6 rounded-md shadow-md -mt-20 w-full max-w-screen-xl'>
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center'>
            <div className='flex items-center'>
              <img src={`${baseURL}/file/${restaurant?.image}`} alt='Restaurant' className='w-24 h-24 rounded-xl' />
              <div className='ml-4'>
                <h3 className='text-xl font-bold'>{restaurant?.title}</h3>
                <p className='text-cyan-600'>{restaurant?.subtitle}</p>
                <p className='text-red-500 flex items-center'>
                  <FontAwesomeIcon icon={faMapMarkerAlt} className='mr-1' /> {restaurant?.address}
                </p>
              </div>
            </div>
            <div className='flex flex-col md:flex-row gap-4 mt-4 md:mt-0'>
              <InfoBadge icon={faTruck} text='83 Products' />
              <InfoBadge icon={faStar} text='4.9 Rating' />
              <InfoBadge icon={faUser} text='4.9 Followers' />
              {restaurant?.freeShip ? (
                <InfoBadge icon={faTruck} text='Free Shipping' additionalClass='text-green-500' />
              ) : (
                <span className='text-gray-600'>No Free Shipping</span>
              )}
            </div>
          </div>
          <div className='mt-4'>
            <p className='flex items-center'>
              <FontAwesomeIcon icon={faCalendarAlt} className='mr-2' /> Open Date: {restaurant?.openDate}
            </p>
            <p className='flex items-center'>
              <FontAwesomeIcon icon={faInfoCircle} className='mr-2' /> {restaurant?.description}
            </p>
          </div>
        </div>
      </div>

      {/* Phần nội dung giới hạn chiều rộng */}
      <div className='max-w-screen-xl mx-auto mt-10'>
        {/* Danh sách món ăn */}
        {/* Filter Form */}
        <div className='w-full mb-6 border-gray-100  p-4 rounded-md shadow-md flex justify-between items-center'>
          <div className='flex flex-col md:flex-row gap-4'>
            <div>
              <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                Sort by Key word
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={filters.name}
                onChange={handleFilterChange}
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50'
              />
            </div>
            <div>
              <label htmlFor='sortByPrice' className='block text-sm font-medium text-gray-700'>
                Sort by Price
              </label>
              <select
                id='sortByPrice'
                name='sortByPrice'
                value={filters.sortByPrice}
                onChange={handleFilterChange}
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50'
              >
                <option value=''>None</option>
                <option value='asc'>Low to High</option>
                <option value='desc'>High to Low</option>
              </select>
            </div>
          </div>
        </div>
        {restaurant?.category.map((category) => (
          <div key={category.id} className='bg-white p-4 mt-4 rounded-md shadow-md'>
            <h3 className='text-xl font-bold mb-2'>{category.name}</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {filteredMenus(category.menus).map((menu: Menu) => (
                <div
                  key={menu.id}
                  className='flex items-center bg-white p-2 rounded-md cursor-pointer hover:shadow-md border border-gray-200'
                  onClick={() => openProductModal(menu)}
                >
                  <img
                    src={`${baseURL}/file/${menu.image}`}
                    className='w-20 h-20 object-cover rounded-full mr-4'
                    alt={menu.title}
                  />
                  <div className='flex-1'>
                    <h4 className='text-lg font-bold'>{menu.title}</h4>
                    <p className='text-gray-500'>{menu.description}</p>
                  </div>
                  <div className='text-right'>
                    <p className='text-red-600 font-bold'>${menu.price}</p>
                    <div className='flex items-center justify-end mt-2'>
                      {menu.freeShip ? (
                        <>
                          <FontAwesomeIcon icon={faTruck} className='text-green-500 mr-1' />
                          <span className='text-green-500'>Free Shipping</span>
                        </>
                      ) : (
                        <span className='text-gray-600'>No Free Shipping</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <ElementDetailRestaurant />
      </div>

      {/* Modal sản phẩm */}
      <ProductModal isOpen={selectedProduct !== null} onClose={closeProductModal} product={selectedProduct} />
    </div>
  )
}

function InfoBadge({ icon, text, additionalClass = '' }: { icon: any; text: string; additionalClass?: string }) {
  return (
    <div
      className={`bg-gray-200 text-gray-700 px-4 py-2 rounded-md flex items-center space-x-1 shadow-md ${additionalClass}`}
    >
      <FontAwesomeIcon icon={icon} className='w-4 h-4 inline-block' />
      <span>{text}</span>
    </div>
  )
}
