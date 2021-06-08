import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, Toast, Container, Icon,
} from '@edx/paragon';
import { Add } from '@edx/paragon/icons';
import Filter from 'components/Filters';
import Table from 'components/Table';
import {
  filterEnrollmentsAction,
  unenrollAction,
  clearToastNotification,
  clearFilterAction,
} from 'data/actions/enrollment';

import './index.scss';

const App = ({ history }) => {
  const data = useSelector(state => state.data);
  const showNotification = useSelector(state => state.showNotification);
  const notificationMessage = useSelector(state => state.notificationMessage);
  const dispatch = useDispatch();
  const initialFilterValues = {
    usernameOrEmail: '',
    courseId: '',
    externalPlatform: '',
    isActive: '',
  };

  const handleClickFilter = (filters) => dispatch(filterEnrollmentsAction(filters));
  const handleClickClear = () => dispatch(clearFilterAction());
  const handleClickUnenroll = (params) => dispatch(unenrollAction(params));
  const handleAddEnrollment = () => history.push('/create');

  const ToastMessage = () => (
    <Toast
      onClose={() => dispatch(clearToastNotification())}
      show={showNotification}
    >
      {notificationMessage}
    </Toast>
  );

  return (
    <>
      <Container size="xl" className="my-4">
        <h3 className="title-wrapper">Enrollment Viewer</h3>
        <Button
          className="ml-3"
          variant="primary"
          onClick={handleAddEnrollment}
        >
          <Icon src={Add} />Add Enrollment
        </Button>
        <Filter
          initialFilterValues={initialFilterValues}
          handleClickFilter={handleClickFilter}
          handleClickClear={handleClickClear}
        />
        <Table
          data={data}
          handleClickUnenroll={handleClickUnenroll}
        />
        {
          showNotification && <ToastMessage />
        }
      </Container>
    </>
  );
};

export { App };
