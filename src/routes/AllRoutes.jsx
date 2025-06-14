import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages (Public)
import { Landing } from '../pages/Landing';
import { Product } from '../pages/Product';
import ProductDetailPage from '../pages/ProductDetailPage';
import { About } from '../pages/About';
import LoginPage from '../components/LoginPage';

// Pages (Admin)
import AddBannerForm from '../pages/AddBannerForm';
import AddCategoryForm from '../pages/AddCategoryForm';
import AddProductForm from '../pages/AddProductForm';

// Layouts & Route Protection
import Layout from './Layout';
import ProtectedRoute from '../networking/ProtectedRoute';
import AddBlogForm from '../pages/AddBlogForm';

export const AllRoutes = () => {
  return (
    <Routes>
      {/* 🌐 Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/product" element={<Product />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<LoginPage />} />

      {/* 🔐 Protected Admin Routes */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route element={<Layout />}>
          <Route path="/admin/banner" element={<AddBannerForm />} />
          <Route path="/admin/categories" element={<AddCategoryForm />} />
          <Route path="/admin/products" element={<AddProductForm />} />
           <Route path="/admin/blogs" element={<AddBlogForm />} />
        </Route>
      </Route>
    </Routes>
  );
};
