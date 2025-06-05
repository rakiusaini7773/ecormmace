import React from 'react'
import SunscreenSlider from '../components/SunscreenSlider'
import Navbar from '../components/common/Navbar'
import ProductList from '../components/ProductList'
import FAQ from '../components/FAQ'
import Footer from '../components/common/Footer'


export const Product = () => {
  return (
    <div>
      <Navbar />
      <div className='w-full max-w-screen-3xl mx-auto '>
        <SunscreenSlider />
      </div>
     <div className='w-full max-w-7xl mx-auto'>
      <ProductList />
     </div>
        <FAQ />
        <Footer />
    </div>
  )
}
