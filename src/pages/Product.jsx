import React from 'react'
import SunscreenSlider from '../components/SunscreenSlider'
import Navbar from '../components/common/Navbar'
import ProductListing from '../components/ProductListing'

export const Product = () => {
  return (
    <div>
      <Navbar />
      <div className='w-full max-w-screen-3xl mx-auto '>
        <SunscreenSlider />
      </div>
      <ProductListing />

    </div>
  )
}
