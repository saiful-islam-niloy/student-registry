import React, { Component, Fragment } from 'react';
import { Container } from 'react-bootstrap';
import Banner from '../components/Banner';
import Features from '../components/Features';

class HomePage extends Component {
  render() {
    return (
      <Fragment>
        <Container fluid={true} className='background'>
          <Banner />
          <Features />
        </Container>
      </Fragment>
    );
  }
}

export default HomePage;
