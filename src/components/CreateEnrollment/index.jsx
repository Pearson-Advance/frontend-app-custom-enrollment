import React, { useState, useEffect } from 'react';
import useForm from '../../hooks/useForm';
import { CreateForm } from '../Form';
import { StatusMonitor } from '../Monitor';

import EnrollmentDataApiService from '../../services/dataApi';

import './index.scss';

const initialFormValidation = {
  courseId: null,
  mode: null,
  emails: null,
};

const formatValidationErrors = (errors) => {
  const fieldErrors = JSON.parse(errors.customAttributes.httpErrorResponseData);

  return {
    courseId: fieldErrors.course_id ? fieldErrors.course_id[0] : null,
    mode: fieldErrors.course_mode ? fieldErrors.course_mode[0] : null,
    emails: fieldErrors.email_list ? fieldErrors.email_list[0][0] : null,
  };
};

const CreateEnrollment = () => {
  const [state, setState] = useState({
    taskId: null,
    data: null,
    errors: initialFormValidation,
    showLoading: false,
  });

  const [formValues, handleinputChange, reset] = useForm({
    courseId: '',
    mode: '',
    emails: '',
  });

  const TIME_MS_STATUS_CHECK = 5000;

  const updateEnrollmentStatus = () => {
    if (state.taskId) {
      EnrollmentDataApiService.fetchEnrollmentStatus(state.taskId).then((response) => {
        if (response.data.status === 'SUCCESS') {
          setState({
            ...state,
            data: response.data.result,
          });
        }
      }).catch(() => {
        setState({
          ...state,
          data: null,
        });
      });
    }
  };

  const handleEnroll = (e) => {
    e.preventDefault();
    EnrollmentDataApiService.createEnrollment(formValues).then((response) => {
      setState({
        ...state,
        errors: initialFormValidation,
        taskId: response.data.task_id,
      });
    }).catch((error) => {
      setState({
        ...state,
        data: null,
        errors: formatValidationErrors(error),
      });
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateEnrollmentStatus();
    }, TIME_MS_STATUS_CHECK);

    return () => clearInterval(interval);
  });

  return (
    <div className="row">
      <div className="col-6">
        <CreateForm
          formValues={formValues}
          handleinputChange={handleinputChange}
          handleEnroll={handleEnroll}
          errors={state.errors}
          reset={reset}
        />
      </div>
      <div className="col-6 d-flex">
        <StatusMonitor data={state.data} showLoading={state.showLoading} />
      </div>
    </div>
  );
};

export { CreateEnrollment };
