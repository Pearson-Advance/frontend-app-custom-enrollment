import React from 'react';

import { Form, Col, Button } from '@edx/paragon';

import './index.scss';

const CreateForm = ({
  courseId, mode, emails, handleinputChange, handleEnroll, errors, reset,
}) => (
  <div className="form-wrapper m-5">
    <h3 className="title-wrapper">Create enrollment</h3>
    <Form onSubmit={handleEnroll}>
      <Form.Row>
        <Form.Group as={Col} controlId="courseId" isInvalid={!!errors.courseId}>
          <Form.Control
            type="text"
            floatingLabel="Course Id"
            value={courseId}
            onChange={handleinputChange}
          />
          {errors.courseId && <Form.Control.Feedback type="invalid">{errors.courseId}</Form.Control.Feedback>}
        </Form.Group>

        <Form.Group as={Col} controlId="mode" isInvalid={!!errors.mode}>
          <Form.Control
            as="select"
            floatingLabel="Course mode"
            defaultValue={mode}
            onChange={handleinputChange}
          >
            <option value="">Choose...</option>
            <option value="audit">Audit</option>
            <option value="verified">Verified</option>
          </Form.Control>
          {errors.mode && <Form.Control.Feedback type="invalid">{errors.mode}</Form.Control.Feedback>}
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} controlId="emails" isInvalid={!!errors.emails}>
          <Form.Control
            type="text"
            as="textarea"
            floatingLabel="Email list"
            value={emails}
            onChange={handleinputChange}
          />
          {errors.emails && <Form.Control.Feedback type="invalid">{errors.emails}</Form.Control.Feedback>}
        </Form.Group>
      </Form.Row>

      <Button variant="primary" type="submit">
        Submit
      </Button>
      <Button variant="primary" type="button" onClick={reset}>
        Reset
      </Button>
    </Form>
  </div>
);

export { CreateForm };
