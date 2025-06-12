// AllRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Landing } from '../pages/Landing';
import { Product } from '../pages/Product';
import ProductDetailPage from '../pages/ProductDetailPage';
import { About } from '../pages/About';
import LoginPage from '../components/LoginPage';
import Layout from './Layout';
import AddBannerForm from '../pages/AddBannerForm';
import AddCategoryForm from '../pages/AddCategoryForm';
import AddProductForm from '../pages/AddProductForm';


export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/product" element={<Product />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/about" element={<About />} />
      <Route element={<Layout />}>
        <Route path="/admin/banner" element={<AddBannerForm />} />
         <Route path="/admin/categories" element={<AddCategoryForm />} />
          <Route path="/admin/products" element={<AddProductForm />} />
      </Route>
    </Routes>
  );
};
