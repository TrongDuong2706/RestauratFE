import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { getRestaurantPage } from 'src/apis/restaurant.api'
import { useQueryString } from 'src/utils/utils'
import { clearRestaurantIDFromLS, saveRestaurantIDToLS } from 'src/utils/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faMapMarkerAlt, faPhone, faStar } from '@fortawesome/free-solid-svg-icons'

export default function ProductList() {
  const queryString = useQueryString()
  const page = Number(queryString.page) || 1
  const baseURL = 'http://localhost:8080/restaurant'
  const pageSize = 6
  const navigate = useNavigate()

  const { data, isLoading, error } = useQuery({
    queryKey: ['restaurants', page],
    queryFn: () => getRestaurantPage(page, pageSize)
  })

  if (isLoading) {
    return <div className='flex items-center justify-center h-screen text-2xl text-gray-600'>Loading...</div>
  }

  if (error) {
    return <div className='flex items-center justify-center h-screen text-2xl text-red-600'>Error loading data</div>
  }

  const restaurants = data?.data.data || []
  const totalItems = restaurants.length > 0 ? restaurants[0].totalItems : 0
  const totalPages = Math.ceil(totalItems / pageSize)
  const currentPage = page

  const categories = [
    {
      icon: '🔥',
      title: 'Popular',
      options: '206+'
    },
    {
      icon: '🛵',
      title: 'Fast Delivery',
      options: '1,843+'
    },
    {
      icon: '💰',
      title: 'High class',
      options: '25+'
    },
    {
      icon: '🍽️',
      title: 'Dine in',
      options: '182+'
    },
    {
      icon: '🏠',
      title: 'Pick up',
      options: '3,548+'
    },
    {
      icon: '📍',
      title: 'Nearest',
      options: '44+'
    }
  ]

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      navigate(`?page=${newPage}`)
    }
  }

  const handleRestaurantClick = (restaurantId: any) => {
    clearRestaurantIDFromLS()
    saveRestaurantIDToLS(restaurantId)
  }

  return (
    <div className='flex flex-col pt-5'>
      <div className='w-full mb-6 relative'>
        {/* Hình ảnh với lớp overlay đen */}
        <div className='relative'>
          <img src='https://banffcurry.com/images/slider/2.jpg' alt='' className='w-full h-80 object-cover' />
          <div className='absolute inset-0 bg-black opacity-60 flex items-center justify-center'>
            <h1 className='text-white text-4xl font-bold'>Restaurant</h1>
          </div>
        </div>
      </div>

      <div className='flex flex-grow'>
        {/* Sidebar */}
        <div className='bg-white text-gray-900 flex flex-col w-1/5 py-8 px-4 shadow-lg'>
          <h2 className='text-center text-2xl font-bold mb-6'>Thông Tin Liên Hệ</h2>
          <div className='mb-8'>
            <div className='flex items-start mb-4'>
              <div className='mr-2'>
                <FontAwesomeIcon icon={faMapMarkerAlt} className='text-red-500 text-lg' />
              </div>
              <div>
                <h3 className='font-semibold text-lg mb-2'>Địa Chỉ:</h3>
                <p className='mb-4'>123 Đường ABC, Quận 1, TP.HCM</p>
              </div>
            </div>
            <div className='flex items-start mb-4'>
              <div className='mr-2'>
                <FontAwesomeIcon icon={faPhone} className='text-red-500 text-lg' />
              </div>
              <div>
                <h3 className='font-semibold text-lg mb-2'>Số Điện Thoại:</h3>
                <p className='mb-4'>(+84) 123 456 789</p>
              </div>
            </div>
            <div className='flex items-start mb-4'>
              <div className='mr-2'>
                <FontAwesomeIcon icon={faEnvelope} className='text-red-500 text-lg' />
              </div>
              <div>
                <h3 className='font-semibold text-lg mb-2'>Email:</h3>
                <p className='mb-4'>contact@restaurant.com</p>
              </div>
            </div>
          </div>
          <h2 className='text-center text-2xl font-bold mb-6'>Bộ Lọc Tìm Kiếm</h2>
          <div>
            <h3 className='font-bold mb-4'>Theo Số Sao</h3>
            <div className='mb-4 flex items-center'>
              <input type='checkbox' id='star5' className='form-checkbox h-5 w-5 text-yellow-400' />
              <label htmlFor='star5' className='ml-2 text-lg flex items-center'>
                <FontAwesomeIcon icon={faStar} className='text-yellow-400' />
                <FontAwesomeIcon icon={faStar} className='text-yellow-400' />
                <FontAwesomeIcon icon={faStar} className='text-yellow-400' />
                <FontAwesomeIcon icon={faStar} className='text-yellow-400' />
                <FontAwesomeIcon icon={faStar} className='text-yellow-400' />
                <span className='ml-2 text-gray-700'>(500+)</span>
              </label>
            </div>
            <div className='mb-4 flex items-center'>
              <input type='checkbox' id='star5' className='form-checkbox h-5 w-5 text-yellow-400' />
              <label htmlFor='star5' className='ml-2 text-lg flex items-center'>
                <FontAwesomeIcon icon={faStar} className='text-yellow-400' />
                <FontAwesomeIcon icon={faStar} className='text-yellow-400' />
                <FontAwesomeIcon icon={faStar} className='text-yellow-400' />
                <FontAwesomeIcon icon={faStar} className='text-yellow-400' />
                <span className='ml-2 text-gray-700'>(400+)</span>
              </label>
            </div>
            {/* Các checkbox khác tương tự */}
          </div>
        </div>

        {/* Main Content */}
        <div className='bg-white flex-1 p-8 shadow-xl'>
          <h2 className='text-2xl font-bold mb-4'>Explore categories</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4'>
            {categories.map((category) => (
              <div key={category.title} className='bg-white rounded-md shadow-md p-4'>
                <div className='flex items-center justify-center mb-2'>
                  <span className='text-3xl text-red-500'>{category.icon}</span>
                </div>
                <h3 className='text-xl font-medium mb-1 text-center'>{category.title}</h3>
                <p className='text-gray-500 text-sm text-center'>{category.options}+ options</p>
              </div>
            ))}
          </div>

          {/* Header */}
          <div className='flex items-center justify-between mb-8 mt-6'>
            <h1 className='text-3xl font-bold text-gray-800'>Restaurant</h1>
            <div className='flex items-center space-x-4'>
              <svg
                className='w-6 h-6 text-gray-600 cursor-pointer'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341A6.002 6.002 0 006 11v3.159c0 .538-.214 1.053-.595 1.436L4 17h5'
                ></path>
              </svg>
              <button className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg'>
                Enable Alerts
              </button>
            </div>
          </div>

          {/* Restaurant Grid */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4'>
            {restaurants.map((restaurant) => (
              <Link
                to={`/product/${restaurant.id}`}
                key={restaurant.id}
                onClick={() => handleRestaurantClick(restaurant.id)}
                className='block hover:transform hover:scale-105 transition-transform duration-300'
              >
                <div className='bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full'>
                  <img src={`${baseURL}/file/${restaurant.image}`} alt='' className='w-full h-40 object-cover' />
                  <div className='p-6 flex flex-col flex-1'>
                    <div className='flex justify-between items-center mb-4'>
                      <div className='flex flex-col space-y-1'>
                        <h2 className='text-lg font-bold text-gray-800'>{restaurant.title}</h2>
                        <p className='text-sm text-gray-600'>{restaurant.subtitle}</p>
                        <p className='text-sm text-red-400'>
                          {restaurant.freeShip ? 'Free Shipping' : 'No Free Shipping'}
                        </p>
                      </div>
                      <div className='flex items-center space-x-1 text-yellow-500'>
                        <FontAwesomeIcon icon={faStar} className='text-xl' />
                        <span className='text-sm'>{restaurant.rating}</span>
                      </div>
                    </div>
                    <p className='text-gray-700 mb-4 flex-1'>{restaurant.description}</p>
                    <button className='bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg w-full transition duration-300 mt-auto'>
                      Restaurant Detail
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className='flex justify-center mt-8'>
            <nav aria-label='Page navigation'>
              <ul className='flex space-x-4'>
                <li>
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg text-gray-600 ${
                      currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }).map((_, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handlePageChange(index + 1)}
                      className={`px-4 py-2 rounded-lg text-gray-600 ${
                        currentPage === index + 1 ? 'bg-purple-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg text-gray-600 ${
                      currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}
