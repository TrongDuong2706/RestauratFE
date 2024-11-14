import React from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'
interface Props {
  type: React.HTMLInputTypeAttribute
  errorMessage?: string
  placeholder?: string
  register: UseFormRegister<any>
  rules?: RegisterOptions
  name: string
  text: string
}

export default function Input({ type, text, errorMessage, name, placeholder, register, rules }: Props) {
  return (
    <div className='mt-4'>
      <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
        {text}
      </label>
      <input
        type={type}
        {...register(name, rules)}
        placeholder={placeholder}
        className='shadow-md border-black mt-1 p-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md'
      />
      <div className='mt-1 text-red-400'>{errorMessage}</div>
    </div>
  )
}
