import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '../src/asset/css/custom.scss';
import AppRoute from './router/AppRoute';

function App() {
  return (
    <BrowserRouter>
      <AppRoute />
    </BrowserRouter>
  );
}

export default App;
