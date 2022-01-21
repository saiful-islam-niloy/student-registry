import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';

export default class Banner extends Component {
  render() {
    return (
      <Card className='banner_background'>
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>Some quick example text to build on the card title and make up the bulk of the cards content.</Card.Text>
          <Button variant='primary'>Go somewhere</Button>
        </Card.Body>
      </Card>
    );
  }
}
