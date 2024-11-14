import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { log } from 'console'
import { omit } from 'lodash'
import React, { useContext } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'

import { Link, useNavigate } from 'react-router-dom'
import { loginAccount } from 'src/apis/auth.api'
import Input from 'src/components/Input'
import { loginSchema } from 'src/utils/rules'
import { AppContext } from 'src/contexts/app.context'
//import { loginSchema, schema, Schema } from 'src/utils/rules'

type FormData = loginSchema

export default function Login() {
  const { setIsAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema) // Enable form validation
  })

  const loginAccountMutation = useMutation({
    mutationFn: (body: FormData) => {
      const formData = new FormData()
      formData.append('username', body.username)
      formData.append('password', body.password)
      return loginAccount(formData)
    },
    onSuccess: (response) => {
      const roleId = localStorage.getItem('roleId')
      const check = response.data.data
      if (check) {
        setIsAuthenticated(true)

        if (roleId === '1') {
          navigate('/admin')
        } else if (roleId === '2') {
          navigate('/')
        } else {
          alert('Login failed. Please check your username and password.')
        }
      } else {
        alert('Login failed. Please check your username and password.')
      }
    },
    onError: (error) => {
      console.error(error) // Xử lý lỗi một cách phù hợp
      alert('Login failed. Please check your username and password.') // Example error handling
    }
  })

  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data)
  })

  return (
    <div className='flex flex-col min-h-screen'>
      <form onSubmit={onSubmit} noValidate>
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
              <h1 className='text-center text-3xl lg:text-[50px]'>Sign In</h1>
              <p className='text-center pt-3 text-gray-500 lg:pt-6'>
                Join to Our Community with all time access and free
              </p>
              <Input
                text='Email'
                name='username'
                register={register}
                type='text'
                errorMessage={errors.username?.message}
                placeholder='Your email'
              />
              <Input
                text='Password'
                name='password'
                register={register}
                type='password'
                errorMessage={errors.password?.message}
                placeholder='Your password'
              />

              <div className='mt-6'>
                <button type='submit' className='bg-black text-white p-3 rounded-md w-full'>
                  Sign In
                </button>
              </div>
              <div className='mt-5 flex justify-center'>
                <span className='text-center'>Don't have an account? </span>
                <Link className='text-center ml-1 text-red-400' to='/register'>
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
