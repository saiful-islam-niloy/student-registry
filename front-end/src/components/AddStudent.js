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
    let { name, email, university, major } = this.state;

    let student = {
      name,
      email,
      university,
      major
    };
    RestClient.PostRequest('http://localhost:5050/add-student', JSON.stringify(student))
      .then((result) => {
        if (result) console.log(result);
      })
      .catch((error) => {
        alert('Failed! ' + error.response.data);
      });
  }
  render() {
    return (
      <Form className='mt-4 form'>
        <Form.Group className='mb-3'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' placeholder='Enter email' onChange={(e) => this.setState({ email: e.target.value })} />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Name</Form.Label>
          <Form.Control type='text' placeholder='Name' onChange={(e) => this.setState({ name: e.target.value })} />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Univeristy</Form.Label>
          <Form.Control type='text' placeholder='Univeristy' onChange={(e) => this.setState({ university: e.target.value })} />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Major</Form.Label>
          <Form.Control type='text' placeholder='Major' onChange={(e) => this.setState({ major: e.target.value })} />
        </Form.Group>

        <Button variant='primary' onClick={() => this.addStudent()}>
          Submit
        </Button>
      </Form>
    );
  }
}
