import React from 'react';
import './App.css';
import { AllRoutes } from './routes/AllRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    
      <>
        <AllRoutes />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light" // or "light", "dark"
        />
      </>
   
  );
}

export default App;
