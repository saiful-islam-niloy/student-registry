import React, { Component } from 'react';
import { Card, Col, Row } from 'react-bootstrap';

export default class Features extends Component {
  constructor() {
    super();
    this.state = {
      view: '',
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
          <Card style={{ background: gradient }} className='feature_card'>
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
    return (
      <Col lg={4} md={6}>
        <Row className='feature'>
          {this.state.view}
          {/* <br /> */}
        </Row>
      </Col>
    );
  }
}
