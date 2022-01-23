import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import RestClient from '../network/RestClient';
import NoStudent from './NoStudent';

export default class UpdateStudent extends Component {
  constructor() {
    super();
    this.state = {
      view: '',
      list: true,
      shouldUpdateList: true,
      email: '',
      name: '',
      university: '',
      major: '',
      students: []
    };
  }

  static propTypes = {
    gradient: PropTypes.string.isRequired
  };

  componentDidMount() {
    this.getAllStudents();
  }

  getAllStudents() {
    RestClient.GetRequest('http://localhost:5050/get-all-student').then((response) => {
      this.setState({ students: response });
      this.renderStudents();
    });
  }

  renderStudents() {
    let { students } = this.state;
    if (!students) return;
    let view = students.map((student, index) => {
      let { name, university, email, major } = student;
      return (
        <Col lg={4} md={4} key={index}>
          <Card
            className='student_card'
            style={{ background: this.props.gradient }}
            onClick={() => this.setState({ list: false, email: email, name: name, university: university, major: major })}>
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text>University: {university}</Card.Text>
              <Card.Text>Major: {major}</Card.Text>
              <Card.Text>Email: {email}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      );
    });
    this.setState({ view: view, shouldUpdateList: false });
  }

  updateStudent() {
    let { name, email, university, major } = this.state;

    let student = {
      name,
      email,
      university,
      major
    };
    RestClient.PutRequest('http://localhost:5050/update-student', JSON.stringify(student))
      .then(() => {
        this.getAllStudents();
        this.setState({ list: true, view: '' });
      })
      .catch((error) => {
        alert('Message Sent Failed! ' + error);
      });
  }

  render() {
    let { view, list, students, email, name, university, major } = this.state;
    return (
      <Container>
        <Row>
          {students == null && (
            <Container className='center'>
              <NoStudent />
            </Container>
          )}
          {list && view}
          {!list && (
            <Row className='center'>
              <Form className='mt-4 form'>
                <Form.Group className='mb-3'>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type='email' placeholder='Enter email' defaultValue={email} disabled />
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='text'
                    defaultValue={name}
                    placeholder='Name'
                    onChange={(e) => this.setState({ name: e.target.value })}
                  />
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>Univeristy</Form.Label>
                  <Form.Control
                    type='text'
                    defaultValue={university}
                    placeholder='Univeristy'
                    onChange={(e) => this.setState({ university: e.target.value })}
                  />
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>Major</Form.Label>
                  <Form.Control
                    type='text'
                    defaultValue={major}
                    placeholder='Major'
                    onChange={(e) => this.setState({ major: e.target.value })}
                  />
                </Form.Group>

                <Button variant='primary' onClick={() => this.updateStudent()}>
                  Submit
                </Button>
              </Form>
            </Row>
          )}
        </Row>
      </Container>
    );
  }
}
