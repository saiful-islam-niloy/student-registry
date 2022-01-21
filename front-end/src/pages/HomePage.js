import React, { Component, Fragment } from 'react';
import { Container } from 'react-bootstrap';
import Banner from '../components/Banner';

class HomePage extends Component {
  render() {
    return (
      <Fragment>
        <Container fluid={true} className='background'>
          <Banner />
        </Container>
      </Fragment>
    );
  }
}

export default HomePage;
