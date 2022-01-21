import React, { Component, Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';

class AppRoute extends Component {
  render() {
    return (
      <Fragment>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/home' element={<HomePage />} />
        </Routes>
      </Fragment>
    );
  }
}

export default AppRoute;
