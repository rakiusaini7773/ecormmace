import React from 'react'
import Navbar from '../components/common/Navbar'
import TantrumSlider from '../LandingPage/TantrumSlider'
import DetanSpotlight from '../LandingPage/DetanSpotlight'
import BodycareSpotlight from '../LandingPage/BodycareSpotlight'
import SkinHelpSection from '../LandingPage/SkinHelpSection'
import FoxtaleHighlight from '../LandingPage/FoxtaleHighlight'
import ProductPlaybook from '../LandingPage/ProductPlaybook'
import LatestPosts from '../LandingPage/LatestPosts'
import AppPromoBanner from '../LandingPage/AppPromoBanner'
import Footer from '../components/common/Footer'
import SunscreenSelector from '../components/SunscreenSelector'

export const Landing = () => {
  return (
   <div >
      <Navbar />
      <div className='bg-[#dadaf3]'>
        <TantrumSlider />
        <div className='w-full h-auto relative'>
          <div className='absolute top-0 left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-[#dadaf3] w-[300px] h-[100px] flex items-start justify-center text-xl font-bold text-[#fff] rounded-full '>
            <div className='h-[50px] flex items-end justify-center  '>
              Oil-Control Spotlight
            </div>
          </div>
          <DetanSpotlight />
        </div>
      </div>
      <div>
        <div className="flex justify-center items-center  p-12">
          <img src="https://foxtale.in/cdn/shop/files/DESKTOP_-_2025-04-16T115525.012.jpg?v=1744784845&width=1600" alt="Detan Spotlight" className='w-full h-auto' />
        </div>
        <BodycareSpotlight />
        <SunscreenSelector />
        <div className='flex justify-center items-center  p-12'> 
          <img src="https://foxtale.in/cdn/shop/files/DESKTOP_-_2025-05-07T193624.258.jpg?v=1746626805&width=1600" alt="Detan Spotlight" className='w-full h-auto' />
        </div>

      </div>

      <SkinHelpSection />
      <FoxtaleHighlight />  
       <ProductPlaybook />
       <LatestPosts />
       <AppPromoBanner />
       <Footer />

    </div>
  )
}
