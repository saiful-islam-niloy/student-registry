import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import RestClient from '../network/RestClient';

export default class AddStudent extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      university: '',
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
        if (result) {
          if (result.data == 'Email already registered!') alert(result.data);
        }
        this.reset();
      })
      .catch((error) => {
        alert('Failed! ' + error.response.data);
        this.reset();
      });
  }

  reset() {
    this.setState({ name: '', email: '', university: '', major: '' });
  }

  render() {
    return (
      <Form className='mt-4 form'>
        <Form.Group className='mb-3'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Name</Form.Label>
          <Form.Control type='text' placeholder='Name' value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>University</Form.Label>
          <Form.Control
            type='text'
            placeholder='University'
            value={this.state.university}
            onChange={(e) => this.setState({ university: e.target.value })}
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Major</Form.Label>
          <Form.Control
            type='text'
            placeholder='Major'
            value={this.state.major}
            onChange={(e) => this.setState({ major: e.target.value })}
          />
        </Form.Group>

        <Button variant='primary' onClick={() => this.addStudent()}>
          Submit
        </Button>
      </Form>
    );
  }
}
