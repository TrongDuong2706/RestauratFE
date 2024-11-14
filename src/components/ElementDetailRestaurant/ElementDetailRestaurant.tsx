import React from 'react'

export default function ElementDetailRestaurant() {
  return (
    <div className='mt-10 bg-white p-6 rounded-md shadow-md text-center'>
      <h2 className='text-2xl font-bold mb-4'>Welcome to Pizza House</h2>
      <p className='text-yellow-600 mb-4'>
        Our chefs are working 24/7 and are ready to accept visitors and at any time of the day and night
      </p>
      <p className='text-gray-700 mb-6'>
        We would like to take this opportunity to welcome you at our Pizza House. We are offering a warm, friendly
        atmosphere to share a meal with family and friends at any time of the day or evening.
      </p>
      <button className='bg-red-600 text-white px-6 py-2 rounded-full'>Learn More</button>
      <div className='flex justify-center mt-6'>
        <div className='mx-2'>
          <img
            src='https://static.vecteezy.com/system/resources/previews/002/006/737/original/free-shipping-online-marketing-banner-template-design-illustration-vector.jpg'
            alt='Pizza'
            className='rounded-lg shadow-md w-auto h-96'
          />
          <p className='text-yellow-600 mt-2'>specialty pizza</p>
          <p className='text-red-600 font-bold'>Only $13.99</p>
        </div>
        <div className='mx-2'>
          <img
            src='https://static.vecteezy.com/system/resources/previews/021/618/631/original/sale-and-discount-banner-or-poster-design-template-shopping-promotion-and-advertisement-leaflet-or-flyer-in-black-and-pink-colours-with-indication-of-price-reduction-percentage-vector.jpg'
            alt='Gift Cards'
            className='rounded-lg shadow-md w-auto h-96'
          />
          <p className='text-red-600 mt-2'>receive a free</p>
          <p className='text-red-600 font-bold'>Gift Cards</p>
        </div>
      </div>
    </div>
  )
}
