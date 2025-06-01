import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Landing } from '../pages/Landing';
import { Product } from '../pages/Product';
import ProductDetailPage from '../pages/ProductDetailPage'; // ✅ fixed

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/product" element={<Product />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
    </Routes>
  );
};
