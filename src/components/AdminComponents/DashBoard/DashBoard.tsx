import React from 'react'
import Card from '../Card/Card'

export default function Dashboard() {
  return (
    <div className='p-4'>
      <div className='grid grid-cols-4 gap-4 mb-4'>
        <Card title='Users' value='26K' percentage='-12.4%' color='purple' chart='chart1.png' />
        <Card title='Income' value='$6,200' percentage='40.9%' color='blue' chart='chart2.png' />
        <Card title='Conversion Rate' value='2.49%' percentage='84.7%' color='yellow' chart='chart3.png' />
        <Card title='Sessions' value='44K' percentage='-23.6%' color='red' chart='chart4.png' />
      </div>
      <div className='bg-white p-4 rounded-lg shadow-md'>
        <h4 className='text-lg mb-4'>Traffic</h4>
        <img src='traffic-chart.png' alt='traffic chart' />
      </div>
    </div>
  )
}
