import { useMutation } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { schema } from 'src/utils/rules'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Input from 'src/components/Input'

import { yupResolver } from '@hookform/resolvers/yup'
import { Schema } from 'src/utils/rules'
import { registerAccount } from 'src/apis/auth.api'
import { omit } from 'lodash'
import { toast } from 'react-toastify'
import { error } from 'console'
import { AppContext } from 'src/contexts/app.context'

type FormData = Schema
export default function Register() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  resolver: yupResolver(schema)

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        toast('Đăng ký thành công')
        navigate('/login')
        console.log(data)
      },
      onError: (error) => {}
    })
  })
  return (
    <div className='flex flex-col min-h-screen'>
      <form noValidate onSubmit={onSubmit}>
        <div className='flex flex-col lg:flex-row h-full lg:h-screen'>
          <div className='flex-1 flex items-stretch'>
            <img
              src='https://img.freepik.com/free-photo/noodles-with-pork-pork-balls-chilli-paste-with-soup-thai-style-vegetable-boat-noodles-selective-focus-top-view_1150-45664.jpg?t=st=1717138443~exp=1717142043~hmac=beb8f208aa580f9decf88131870a384b071ecb47e089763892ad8fb5b3751c01&w=900'
              alt=''
              className='object-cover w-full h-60 lg:h-full'
            />
          </div>
          <div className='p-8 lg:p-20 flex-1 shadow-md'>
            <div className='flex flex-col'>
              <h1 className='text-center text-3xl lg:text-[50px]'>Sign Up</h1>
              <p className='text-center pt-3 text-gray-500 lg:pt-6'>
                Join to Our Community with all time access and free
              </p>
              <Input
                text='Email'
                name='email'
                register={register}
                type='email'
                errorMessage={errors.email?.message}
                placeholder='Your email'
              />
              <Input
                text='Full name'
                name='fullname'
                register={register}
                type='text'
                errorMessage={errors.fullname?.message}
                placeholder='Your full name'
              />
              <Input
                text='Password'
                name='password'
                register={register}
                type='password'
                errorMessage={errors.password?.message}
                placeholder='Your password'
              />
              <Input
                text='Confirm password'
                name='confirm_password'
                register={register}
                type='password'
                errorMessage={errors.confirm_password?.message}
                placeholder='Repeat your password'
              />

              <div className='mt-6'>
                <button className='bg-black text-white p-3 rounded-md w-full'>Sign Up</button>
              </div>
              <div className='mt-5 flex justify-center'>
                <span className='text-center'>Already have an account? </span>
                <Link className='text-center ml-1 text-red-400' to='/login'>
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
