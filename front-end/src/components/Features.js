import React, { Component } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import AddStudent from './AddStudent';
import StudentList from './StudentList';

export default class Features extends Component {
  constructor() {
    super();
    this.state = {
      view: '',
      status: 0,
      features: [
        {
          title: 'Student List',
          gradient: 'linear-gradient(135deg, #DFEC51 0%,#73AA0A 100%)'
        },
        {
          title: 'Add Student',
          gradient: 'linear-gradient(135deg, #fcdf8a 0%,#f38381 100%)'
        },
        {
          title: 'Update Student',
          gradient: 'linear-gradient(135deg, #13f1fc 0%,#0470dc 100%)'
        },
        {
          title: 'Delete Student',
          gradient: 'linear-gradient(135deg, #FF57B9 0%,#A704FD 100%)'
        }
      ]
    };
  }

  componentDidMount() {
    this.loadFeatures();
  }

  loadFeatures() {
    let view = this.state.features.map((feature, index) => {
      let { title, gradient } = feature;
      return (
        <Col key={index}>
          <Card style={{ background: gradient }} className='feature_card' onClick={() => this.setState({ status: index })}>
            <Card.Body>
              <Card.Title className='feature_title'>{title}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      );
    });
    this.setState({ view: view });
  }

  render() {
    let { status } = this.state;
    return (
      <Row>
        <Col lg={4} md={6}>
          <Row className='feature'>
            {this.state.view}
            {/* <br /> */}
          </Row>
        </Col>
        <Col lg={8} md={6}>
          <Card className='activity overflow-auto'>
            <Card.Title className='text-center activity_title'>
              {status == -1 && 'Activity Name'}
              {status == 0 && 'Student List'}
              {status == 1 && 'Add Student'}
              {status == 2 && 'Update Student'}
              {status == 3 && 'Delete Student'}
            </Card.Title>
            {status === 0 && <StudentList />}
            {status === 1 && <AddStudent />}
          </Card>
        </Col>
      </Row>
    );
  }
}
