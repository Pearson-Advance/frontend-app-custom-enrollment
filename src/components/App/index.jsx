import React, { useState } from 'react';
import { Button, Toast, Container } from '@edx/paragon';
import Filter from '../Filters';
import Table from '../Table';

import useForm from '../../hooks/useForm';
import EnrollmentDataApiService from '../../services/dataApi';

import './index.scss';

const App = ({ history }) => {
  const [state, setState] = useState({
    data: [],
    notificationMessage: '',
    showNotification: false,
  });

  const [filterValues, handleinputChange] = useForm({
    usernameOrEmail: '',
    courseId: '',
    externalPlatform: '',
  });

  const handleClickFilter = () => EnrollmentDataApiService.fetchEnrollments(filterValues).then((response) => {
    setState({
      ...state,
      data: response.data.results,
    });
  }).catch((error) => {
    setState({
      data: [],
      notificationMessage: error.message.substring(0, 50),
      showNotification: true,
    });
  });

  const handleClickUnenroll = (data) => EnrollmentDataApiService.createUnenrollment(data).then((response) => {
    state.data.find(item => item.id === data.enrollment_id).is_active = response.data.result[0].is_active;
    setState({
      ...state,
      notificationMessage: 'Successfully unenrolled.',
      showNotification: true,
    });
  }).catch((error) => {
    setState({
      ...state,
      notificationMessage: error.message.substring(0, 50),
      showNotification: true,
    });
  });

  const handleAddEnrollment = () => {
    history.push('/create');
  };

  const ToastMessage = () => (
    <Toast
      onClose={() => setState({ ...state, showNotification: false })}
      show={state.showNotification}
    >
      {state.notificationMessage}
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
          Add Enrollment
        </Button>
        <Filter filters={filterValues} handleinputChange={handleinputChange} />
        <Table
          data={state.data}
          handleClickFilter={handleClickFilter}
          handleClickUnenroll={handleClickUnenroll}
        />
        {
          state.showNotification && <ToastMessage />
        }
      </Container>
    </>
  );
};

export { App };
