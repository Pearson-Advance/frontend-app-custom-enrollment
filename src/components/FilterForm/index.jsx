import React, { useRef } from 'react';

import {
  Col, Form, Card, Button, Icon, ButtonGroup, Tooltip, OverlayTrigger,
} from '@edx/paragon';
import './index.scss';
import { Search, Delete } from '@edx/paragon/icons';
import { useDispatch } from 'react-redux';
import { clearFilterAction } from 'data/actions/enrollment';


const FilterForm = ({gotoPage, setAllFilters, skipPageResetRef }) => {
  const dispatch = useDispatch();
  const usernameOrEmail = useRef('');
  const courseId = useRef('');
  const externalPlatform = useRef('');
  const isActive = useRef('');

  const handleSubmit = e => {
    e.preventDefault();
    const filters = [
      {
        "id": "external_platform",
        "value": externalPlatform.current.value
      },
      {
        "id": "course_id",
        "value": courseId.current.value
      },
      {
        "id": "username",
        "value": usernameOrEmail.current.value
      },
      {
        "id": "is_active",
        "value": isActive.current.value
      }
    ];
    gotoPage(0)
    setAllFilters(filters)
    skipPageResetRef.current = true
  }

  const onClear = () => {
    setAllFilters([]);
    dispatch(clearFilterAction())
  };

  return (
    <div className="filter-container col-12 mt-3">
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Card.Title className="filter-header">
              Filters
              <ButtonGroup size="sm">
                <OverlayTrigger
                  key="clear"
                  placement="top"
                  overlay={<Tooltip id="tooltip-top">Clear filters</Tooltip>}
                >
                  <Button variant="inverse-primary" type="reset" onClick={onClear}><Icon src={Delete} /></Button>
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
              <Form.Group
                as={Col}
                controlId="isActive"
              >
                <Form.Control
                  floatingLabel="Is Active"
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
    </div>
  );
};

export { FilterForm };
