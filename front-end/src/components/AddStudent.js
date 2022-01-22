import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import RestClient from '../network/RestClient';

export default class AddStudent extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      univeristy: '',
      major: ''
    };
  }
  addStudent() {
    let { name, email, univeristy, major } = this.state;

    let student = {
      name,
      email,
      univeristy,
      major
    };
    RestClient.PostRequest('http://localhost:5050/add-student', JSON.stringify(student))
      .then((result) => {
        if (result) alert(result);
      })
      .catch((error) => {
        alert('Failed! ' + error.response.data);
      });
  }
  render() {
    return (
      <Form className='mt-4'>
        <Form.Group className='mb-3' onChange={(e) => this.setState({ email: e.target.value })}>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' placeholder='Enter email' />
        </Form.Group>

        <Form.Group className='mb-3' onChange={(e) => this.setState({ name: e.target.value })}>
          <Form.Label>Name</Form.Label>
          <Form.Control type='text' placeholder='Name' />
        </Form.Group>

        <Form.Group className='mb-3' onChange={(e) => this.setState({ university: e.target.value })}>
          <Form.Label>Univeristy</Form.Label>
          <Form.Control type='text' placeholder='Univeristy' />
        </Form.Group>

        <Form.Group className='mb-3' onChange={(e) => this.setState({ major: e.target.value })}>
          <Form.Label>Major</Form.Label>
          <Form.Control type='text' placeholder='Major' />
        </Form.Group>

        <Button variant='primary' onClick={() => this.addStudent()}>
          Submit
        </Button>
      </Form>
    );
  }
}
