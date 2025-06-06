import React, { useEffect } from 'react';
import './App.css';
import { AllRoutes } from './routes/AllRoutes';
import { Provider } from 'react-redux';
import store from './app/store';

import allProducts from './data/products';

// Utility to create a simple hash using JSON.stringify
const generateProductHash = (data) => JSON.stringify(data);

function App() {
  useEffect(() => {
    const storedHash = localStorage.getItem("productsHash");
    const currentHash = generateProductHash(allProducts);

    if (storedHash !== currentHash) {
      // Update localStorage with new product data
      localStorage.setItem("products", JSON.stringify(allProducts));
      localStorage.setItem("productsHash", currentHash);
      console.log("Product data refreshed in localStorage");

   
      window.location.reload(); 
    }
  }, []);

  return (
    <Provider store={store}>
      <AllRoutes />
    </Provider>
  );
}

export default App;
