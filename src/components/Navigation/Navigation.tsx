import Tippy from '@tippyjs/react/headless'
import React, { useState, useEffect, ChangeEvent, useRef } from 'react'
import { Link } from 'react-router-dom'
import Popper from '../Popper'
import RestaurantAccount from '../RestaurantAccount'

// Debounce function
function debounce(func: Function, delay: number) {
  let timer: ReturnType<typeof setTimeout>
  return function (this: unknown, ...args: any[]) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

export default function Navigation() {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>('')
  const [inputFocused, setInputFocused] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleInputFocus = () => {
    setInputFocused(true)
  }

  const handleInputBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (resultsRef.current && !resultsRef.current.contains(e.relatedTarget as Node)) {
      setInputFocused(false)
    }
  }

  // Debounce search query changes
  useEffect(() => {
    const debounced = debounce(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 500)

    debounced()

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [searchQuery])

  // Close search results when clicking outside the input
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node)
      ) {
        setInputFocused(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='flex items-center flex-col'>
      <div>
        <ul className='flex p-2'>
          <li className='p-3'>
            <Link to='/'>Home</Link>
          </li>
          <li className='p-3'>
            <Link to='/productlist'>Restaurant</Link>
          </li>
          <li className='p-3'>News</li>
          <li className='p-3'>Voucher</li>
          <li className='p-3'>Contact</li>
        </ul>
      </div>
      <div>
        <Tippy
          interactive
          placement='bottom-end'
          visible={inputFocused && !!debouncedSearchQuery}
          render={(attrs) => (
            <div tabIndex={-1} {...attrs} className='z-50' ref={resultsRef} onBlur={handleInputBlur}>
              <Popper>
                <RestaurantAccount searchQuery={debouncedSearchQuery} />
              </Popper>
            </div>
          )}
        >
          <div>
            <form className='flex items-center max-w-md mx-auto'>
              <label htmlFor='simple-search' className='sr-only'>
                Search
              </label>
              <div className='relative w-full' ref={inputRef}>
                <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                  <svg
                    className='w-4 h-4 text-gray-500 dark:text-gray-400'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 18 20'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2'
                    />
                  </svg>
                </div>
                <input
                  type='text'
                  id='simple-search'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[450px] ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Search branch name...'
                  value={searchQuery}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  required
                />
              </div>
              <button
                type='submit'
                className='p-2.5 ms-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-blue-300'
              >
                <svg
                  className='w-4 h-4'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 20 20'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                  />
                </svg>
                <span className='sr-only'>Search</span>
              </button>
            </form>
          </div>
        </Tippy>
      </div>
    </div>
  )
}
