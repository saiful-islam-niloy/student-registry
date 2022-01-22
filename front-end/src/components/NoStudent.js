import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

export default class NoStudent extends Component {
  render() {
    return (
      <Card className='no_student'>
        <p>No Student Found!</p>
      </Card>
    );
  }
}
