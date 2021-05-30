import React from 'react';

import { Col, Form, Card } from '@edx/paragon';
import './index.scss';

const Filter = ({
  usernameOrEmail, courseId, externalPlatform, handleinputChange,
}) => (
  <div className="filter-container col-12 mt-3">
    <Card>
      <Card.Body>
        <Card.Title>Filters</Card.Title>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="usernameOrEmail">
              <Form.Control
                type="text"
                floatingLabel="Username or email"
                value={usernameOrEmail}
                onChange={handleinputChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="courseId">
              <Form.Control
                type="text"
                floatingLabel="Course id"
                value={courseId}
                onChange={handleinputChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="externalPlatform">
              <Form.Control
                type="text"
                floatingLabel="External platform"
                value={externalPlatform}
                onChange={handleinputChange}
              />
            </Form.Group>
          </Form.Row>
        </Form>
      </Card.Body>
    </Card>
  </div>
);

export default Filter;
