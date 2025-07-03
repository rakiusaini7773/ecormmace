import React, { useEffect, useState } from 'react';
import Navbar from '../components/common/Navbar';
import TantrumSlider from '../LandingPage/TantrumSlider';
import DetanSpotlight from '../LandingPage/DetanSpotlight';
import BodycareSpotlight from '../LandingPage/BodycareSpotlight';
import SkinHelpSection from '../LandingPage/SkinHelpSection';
import FoxtaleHighlight from '../LandingPage/FoxtaleHighlight';
import ProductPlaybook from '../LandingPage/ProductPlaybook';
import LatestPosts from '../LandingPage/LatestPosts';
import AppPromoBanner from '../LandingPage/AppPromoBanner';
import Footer from '../components/common/Footer';
import SunscreenSelector from '../components/SunscreenSelector';
import LatestLaunches from '../components/LatestLaunches';
import BaseApiManager from '../networking/baseAPIManager';
import { API_ENDPOINTS } from '../networking/apiConfig';
import { toast } from 'react-toastify';

export const Landing = () => {
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await BaseApiManager.get(API_ENDPOINTS.GET_ALL_PRODUCTS);
        console.log('res', res);
        const activeProducts = res.filter((p) => p.status === "Active");
        setProducts(activeProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to fetch products");
      }
    };
    const fetchBlogs = async () => {
      try {
        const response = await BaseApiManager.get(API_ENDPOINTS.GET_ALL_BLOGS);
        const activeBlogs = response.filter(blog => blog.status === 'active');

        setBlogs(activeBlogs);
        setFilteredBlogs(activeBlogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        toast.error('Failed to load blogs');
      }
    };
    fetchProducts();
    fetchBlogs();
  }, []);


  const bodycareProducts = products.filter((p) => p.category?.name === "hyperpigmentation");


  const latestLaunchProducts = products.filter(
    (p) => p.status === "Active" && p.videoUrl
  );
  return (
    <div>
      <Navbar />
      <div className='bg-[#dadaf3]'>
        <TantrumSlider />
        <div className='w-full h-auto relative'>
          <div className='absolute top-0 left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-[#dadaf3] w-[300px] h-[100px] flex items-start justify-center text-xl font-bold text-[#fff] rounded-full '>
            <div className='h-[50px] flex items-end justify-center'>
              Oil-Control Spotlight
            </div>
          </div>
        </div>
        <DetanSpotlight products={products} />
      </div>

      <div>
        <div className="flex justify-center items-center p-0 lg:p-12">
          <img
            src="https://foxtale.in/cdn/shop/files/DESKTOP_-_2025-04-16T115525.012.jpg?v=1744784845&width=1600"
            alt="Detan Spotlight"
            className="sm:w-full h-auto"
          />
        </div>

        <BodycareSpotlight products={bodycareProducts} />
        <SunscreenSelector />

        <div className='flex justify-center items-center p-0 lg:p-12'>
          <img src="https://foxtale.in/cdn/shop/files/DESKTOP_-_2025-05-07T193624.258.jpg?v=1746626805&width=1600" alt="Bodycare Spotlight" className='w-full h-auto' />
        </div>

        <LatestLaunches products={latestLaunchProducts} />
      </div>

      <SkinHelpSection />
      <FoxtaleHighlight />
      <ProductPlaybook />
      <LatestPosts blogs={filteredBlogs} />
      <AppPromoBanner />
      <Footer />
    </div>
  );
};
