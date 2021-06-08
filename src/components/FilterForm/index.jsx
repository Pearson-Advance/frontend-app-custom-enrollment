import React from 'react';

import {
  Col, Form, Card, Button, Icon, ButtonGroup, Tooltip, OverlayTrigger,
} from '@edx/paragon';
import { useFormik } from 'formik';
import './index.scss';
import { Search, Delete } from '@edx/paragon/icons';
import { useDispatch } from 'react-redux';
import { filterEnrollmentsAction, clearFilterAction } from 'data/actions/enrollment';

const FilterForm = () => {
  const dispatch = useDispatch();
  const initialFilterValues = {
    usernameOrEmail: '',
    courseId: '',
    externalPlatform: '',
    isActive: '',
  };
  const formik = useFormik({
    initialValues: initialFilterValues,
    onSubmit: filters =>  dispatch(filterEnrollmentsAction(filters)),
  });

  const onClear = () => {
    formik.resetForm(initialFilterValues);
    dispatch(clearFilterAction());
  };

  return (
    <div className="filter-container col-12 mt-3">
      <Card>
        <Card.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Card.Title className="filter-header">
              Filters
              <ButtonGroup size="sm">
                <OverlayTrigger
                  key="clear"
                  placement="top"
                  overlay={<Tooltip id="tooltip-top">Clear filters</Tooltip>}
                >
                  <Button variant="inverse-primary" onClick={onClear}><Icon src={Delete} /></Button>
                </OverlayTrigger>
                <OverlayTrigger
                  key="search"
                  placement="top"
                  overlay={<Tooltip id="tooltip-top">Apply filters</Tooltip>}
                >
                  <Button variant="inverse-primary" type="submit"><Icon src={Search} /></Button>
                </OverlayTrigger>
              </ButtonGroup>
            </Card.Title>
            <Form.Row>
              <Form.Group as={Col} controlId="usernameOrEmail">
                <Form.Control
                  type="text"
                  floatingLabel="Username or email"
                  value={formik.values.usernameOrEmail}
                  onChange={formik.handleChange}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="courseId">
                <Form.Control
                  type="text"
                  floatingLabel="Course id"
                  value={formik.values.courseId}
                  onChange={formik.handleChange}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="externalPlatform">
                <Form.Control
                  type="text"
                  floatingLabel="External platform"
                  value={formik.values.externalPlatform}
                  onChange={formik.handleChange}
                />
              </Form.Group>
              <Form.Group
                as={Col}
                controlId="isActive"
              >
                <Form.Control
                  floatingLabel="Is Active"
                  as="select"
                  value={formik.values.isActive}
                  onChange={formik.handleChange}
                >
                  <option value="">Choose...</option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export { FilterForm };
