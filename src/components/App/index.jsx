import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, Toast, Container, Icon,
} from '@edx/paragon';
import { Add } from '@edx/paragon/icons';
import { FilterForm } from 'components/FilterForm';
import { Table } from 'components/Table';
import { clearToastNotification } from 'data/actions/enrollment';

const App = ({ history }) => {
  const { data, showNotification, notificationMessage } = useSelector(state => state);
  const dispatch = useDispatch();
  const handleAddEnrollment = () => history.push('/create');

  return (
    <Container size="xl" className="my-3">
      <h3 className="text-center">Enrollment Viewer</h3>
      <Button
        className="ml-3"
        size="sm"
        variant="primary"
        onClick={handleAddEnrollment}
      >
        <Icon src={Add} />Add Enrollment
        </Button>
      <FilterForm />
      <Table data={data} />
      {
        showNotification
        && (
          <Toast
            onClose={() => dispatch(clearToastNotification())}
            show={showNotification}
          >
            {notificationMessage}
          </Toast>
        )
      }
    </Container>
  );
};

export { App };
