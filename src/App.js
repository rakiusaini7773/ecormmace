import React from 'react';
import './App.css';
import { AllRoutes } from './routes/AllRoutes';
import { Provider } from 'react-redux';
import store from './app/store';

function App() {
  return (
    <div>
        <Provider store={store}>
      <AllRoutes />
        </Provider>
     
    </div>

  );
}

export default App;
