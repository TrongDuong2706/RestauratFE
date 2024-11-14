import React, { Fragment } from 'react'
import Footer from 'src/components/Footer'
import ListRestaurant from 'src/components/ListRestaurant'

export default function Home() {
  return (
    <Fragment>
      <div className='my-5'>
        <img src='https://banffcurry.com/images/slider/2.jpg' alt='Banner' />
      </div>
      <div className='max-w-5xl mx-auto'>
        <div className='font-bold text-center mb-7 text-[26px]'>TIN TỨC</div>
        <section className='bg-white py-16'>
          <div className='container mx-auto flex flex-col md:flex-row items-center'>
            <div className='md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left mb-8 md:mb-0'>
              <img
                src='https://media.timeout.com/images/105881603/750/562/image.jpg'
                alt='Coffee Shop'
                className='rounded-lg shadow-lg mb-4'
              />
            </div>
            <div className='md:w-1/2 md:pl-12'>
              <h1 className='text-4xl font-bold text-gray-900 mb-4'>About Us</h1>
              <hr className='border-t-2 border-red-600 w-16 mb-4' />
              <p className='text-gray-700 text-lg leading-relaxed'>
                Oshaneat offers a unique dining experience with a blend of exquisite flavors and a splendid ambiance.
                Known for its distinctive style, Oshaneat combines delicious cuisine with elegant decor and rich music,
                creating an atmosphere of sophistication and warmth that is truly its own.
              </p>
            </div>
          </div>
        </section>
        <div className='grid grid-cols-2 gap-4'>
          <div className='col-span-2'>
            <div className='  rounded-lg'>
              <img
                src='https://hips.hearstapps.com/delish/assets/17/31/1501696933-delish-pizza-sliders-3.jpg'
                alt='Pizza'
                className='w-full h-28 rounded-lg object-cover'
              />
            </div>
          </div>

          <div>
            <div className=' rounded-lg'>
              <img
                src='https://product.hstatic.net/200000495609/product/snack-khoai-tay-lays-max-vi-nam-truffle-banh-keo-an-vat-imnuts-2_9c81abd73988480f851e98f04f78b157_master.jpg'
                alt='Fries'
                className='w-full h-60
                 rounded-lg object-cover'
              />
            </div>
          </div>

          <div>
            <div className=' rounded-lg'>
              <img
                src='https://www.tastingtable.com/img/gallery/what-makes-restaurant-burgers-taste-different-from-homemade-burgers-upgrade/intro-1662064407.jpg'
                alt='Coffee'
                className='w-full h-60 rounded-lg object-cover'
              />
            </div>
          </div>

          <div className='col-span-2'>
            <div className=' rounded-lg'>
              <img
                src='https://t4.ftcdn.net/jpg/07/65/71/65/360_F_765716564_Wakt0jHcec5jxhN8rJ8v0jwuNwIIiCjM.jpg'
                alt='Burger'
                className='w-full h-auto rounded-lg'
              />
            </div>
          </div>
        </div>
        <div className='my-8 text-center'>NHÀ HÀNG</div>
        <ListRestaurant />
      </div>
    </Fragment>
  )
}
