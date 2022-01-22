import React, { Component } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import RestClient from '../network/RestClient';
import NoStudent from './NoStudent';

export default class DeleteStudent extends Component {
  constructor() {
    super();
    this.state = {
      view: '',
      email: '',
      students: []
    };
  }

  componentDidMount() {
    this.getAllStudents();
  }

  getAllStudents() {
    RestClient.GetRequest('http://localhost:5050/get-all-student').then((response) => {
      this.setState({ students: response });
      this.renderStudents();
    });
  }

  deleteStudent(email) {
    let res = confirm(`Delete ${email}?`);
    console.log(email);
    if (!res) return;

    let student = {
      email
    };
    RestClient.DeleteRequest('http://localhost:5050/delete-student?email=' + email, JSON.stringify(student))
      .then(() => {
        this.getAllStudents();
        this.setState({ view: '' });
      })
      .catch((error) => {
        alert('Failed! ' + error);
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
            onClick={() => {
              this.deleteStudent(email);
            }}>
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

  render() {
    let { view, students } = this.state;
    return (
      <Container>
        <Row>
          {view}
          {students == null && (
            <Container className='center'>
              <NoStudent />
            </Container>
          )}
        </Row>
      </Container>
    );
  }
}
