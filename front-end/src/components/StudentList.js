import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import RestClient from '../network/RestClient';
import NoStudent from './NoStudent';

export default class StudentList extends Component {
  constructor() {
    super();
    this.state = {
      view: '',
      students: []
    };
  }

  static propTypes = {
    gradient: PropTypes.string.isRequired
  };

  componentDidMount() {
    RestClient.GetRequest('http://localhost:5050/get-all-student').then((response) => {
      this.setState({ students: response });
      this.renderStudents();
    });
    console.log(this.props);
  }

  renderStudents() {
    let { students } = this.state;
    if (!students) return;
    let view = students.map((student, index) => {
      let { name, university, email, major } = student;
      return (
        <Col lg={4} md={4} key={index}>
          <Card className='student_card' style={{ background: this.props.gradient }}>
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
    this.setState({ view: view });
  }

  render() {
    return (
      <Container>
        <Row>
          {this.state.view}
          {this.state.students == null && (
            <Container className='center'>
              <NoStudent />
            </Container>
          )}
        </Row>
      </Container>
    );
  }
}
