import React from 'react'
import Footer from 'src/components/Footer'
import ListRestaurant from 'src/components/ListRestaurant'
import Navigation from 'src/components/Navigation'
import Header from 'src/components/Header'

interface Props {
  children?: React.ReactNode
}

export default function DefaultLayout({ children }: Props) {
  return (
    <div>
      <Header />
      <Navigation />
      {children}
      <Footer />
    </div>
  )
}
