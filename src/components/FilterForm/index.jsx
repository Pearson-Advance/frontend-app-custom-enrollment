import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Col, Form, Card, Button, Icon, ButtonGroup, Tooltip, OverlayTrigger,
} from '@edx/paragon';
import { Search, Delete } from '@edx/paragon/icons';
import { useDispatch } from 'react-redux';
import {
  filterEnrollmentsAction,
  clearFilterAction,
} from 'data/actions/enrollmentCreator';

import './index.scss';

const FilterForm = ({ pageSize, pageIndex }) => {
  const dispatch = useDispatch();
  const usernameOrEmail = useRef('');
  const courseId = useRef('');
  const externalPlatform = useRef('');
  const isActive = useRef('');
  const handleSearch = e => {
    e.preventDefault();

    const filters = {
      externalplatform: externalPlatform.current.value.trim(),
      courseId: courseId.current.value.trim(),
      usernameOrEmail: usernameOrEmail.current.value.trim(),
      isActive: isActive.current.value.trim(),
    };

    dispatch(filterEnrollmentsAction(pageSize, pageIndex, filters));
  };
  const handleClear = () => dispatch(clearFilterAction());

  return (
    <section className="filter-container col-12 mt-3">
      <Card>
        <Card.Body>
          <Form onSubmit={handleSearch}>
            <Card.Title className="filter-header">
              Filters
              <ButtonGroup size="sm">
                <OverlayTrigger
                  key="clear"
                  placement="top"
                  overlay={<Tooltip id="tooltip-top">Clear filters</Tooltip>}
                >
                  <Button variant="inverse-primary" type="reset" onClick={handleClear}><Icon src={Delete} /></Button>
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
                  ref={usernameOrEmail}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="courseId">
                <Form.Control
                  type="text"
                  floatingLabel="Course id"
                  ref={courseId}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="externalPlatform">
                <Form.Control
                  type="text"
                  ref={externalPlatform}
                  floatingLabel="External platform"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="isActive">
                <Form.Control
                  floatingLabel="Is active"
                  as="select"
                  ref={isActive}
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
    </section>
  );
};

FilterForm.propTypes = {
  pageSize: PropTypes.number,
  pageIndex: PropTypes.number,
};

FilterForm.defaultProps = {
  pageSize: 0,
  pageIndex: 0,
};

export { FilterForm };
