import React from 'react'

interface CardProps {
  title: string
  value: string | number
  percentage?: string // Dấu '?' cho biết prop này là optional
  color: string
  chart: string
}

const Card = ({ title, value, percentage, color, chart }: CardProps) => {
  return (
    <div className={`bg-${color}-500 text-white p-4 rounded-lg shadow-md`}>
      <div className='flex justify-between items-center'>
        <div>
          <h4 className='text-lg'>{title}</h4>
          <p className='text-2xl font-bold'>{value}</p>
          {percentage && <p className='text-sm'>{percentage}</p>}
        </div>
        <div>
          <img src={chart} alt='chart' />
        </div>
      </div>
    </div>
  )
}

export default Card
