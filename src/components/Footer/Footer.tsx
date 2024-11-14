import React from 'react'

export default function Footer() {
  return (
    <footer className='bg-black text-white py-8'>
      <div className='container mx-auto text-center'>
        <h2 className='text-red-600 mb-2 text-xl'>OSAHANEAT</h2>
        <h3 className='text-3xl font-bold mb-4'>THÔNG TIN LIÊN HỆ</h3>
        <hr className='border-t-2 border-red-600 w-24 mx-auto mb-4' />
        <div className='flex flex-col md:flex-row justify-center items-center'>
          <div className='mb-6 md:mb-0 text-center md:text-center flex-1 px-4'>
            <h4 className='font-bold mb-2'>ĐỊA CHỈ</h4>
            <p>70 Lu Gia, Ward 15, District 11, Ho Chi Minh City</p>
          </div>
          <div className='mb-6 md:mb-0 text-center flex-1 px-4'>
            <h4 className='font-bold mb-2'>HOTLINE & EMAIL</h4>
            <p className='text-2xl text-red-600'>1900 6750</p>
            <p>support@sapo.vn</p>
          </div>
          <div className='text-center md:text-center flex-1 px-4'>
            <h4 className='font-bold mb-2'>HỖ TRỢ KHÁCH HÀNG</h4>
            <p>Thứ 2 - Chủ nhật</p>
            <p>7h00 - 23h30</p>
          </div>
        </div>
        <div className='mt-8 flex justify-center space-x-4'>
          <a href='#' className='text-white text-2xl'>
            <i className='fab fa-facebook-f'></i>
          </a>
          <a href='#' className='text-white text-2xl'>
            <i className='fab fa-twitter'></i>
          </a>
          <a href='#' className='text-white text-2xl'>
            <i className='fab fa-instagram'></i>
          </a>
          <a href='#' className='text-white text-2xl'>
            <i className='fab fa-youtube'></i>
          </a>
        </div>
        <p className='mt-8'>© Bản quyền thuộc về Kiến Vàng | Cung cấp bởi Sapo</p>
      </div>
    </footer>
  )
}
