import React, { Component } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import RestClient from '../network/RestClient';

export default class StudentList extends Component {
  constructor() {
    super();
    this.state = {
      view: '',
      students: []
    };
  }

  componentDidMount() {
    RestClient.GetRequest('http://localhost:5050/get-all-student').then((response) => {
      this.setState({ students: response });
      this.renderStudents();
    });
  }

  renderStudents() {
    let view = this.state.students.map((student, index) => {
      let { name, university, email } = student;
      return (
        <Col lg={4} md={4} key={index}>
          <Card className='student_card'>
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text>University: {university}</Card.Text>
              <Card.Text>Email: {email}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      );
    });
    this.setState({ view: view });
  }

  render() {
    return (
      <Container>
        <Row>{this.state.view}</Row>
      </Container>
    );
  }
}
