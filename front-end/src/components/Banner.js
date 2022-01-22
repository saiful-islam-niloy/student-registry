import React, { Component } from 'react';
import { Card, Container } from 'react-bootstrap';

export default class Banner extends Component {
  render() {
    return (
      <Container fluid={true}>
        <br />
        <Card className='banner_background p-2'>
          <Card.Body>
            <Card.Title className='banner_title'>Student Registry System</Card.Title>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}
