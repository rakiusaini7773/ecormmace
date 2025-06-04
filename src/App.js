import React, { useEffect } from 'react';
import './App.css';
import { AllRoutes } from './routes/AllRoutes';
import { Provider } from 'react-redux';
import store from './app/store';

import allProducts from './data/products'; 

function App() {
  useEffect(() => {
    const existingData = localStorage.getItem("products");
    if (!existingData) {
      localStorage.setItem("products", JSON.stringify(allProducts));
      console.log("Products saved to localStorage");
    }
  }, []);

  return (
    <div>
      <Provider store={store}>
        <AllRoutes />
      </Provider>
    </div>
  );
}

export default App;
