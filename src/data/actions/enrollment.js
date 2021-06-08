import {
  FILTER_ENROLLMENTS_SUCCESS,
  FILTER_ENROLLMENTS_FAILURE,
  FILTER_ENROLLMENTS_CLEAR,
  UNENROLL_SUCCESS,
  UNENROLL_FAILURE,
  TOAST_NOTIFICATION_CLEAR,
} from 'data/actions/types';

import EnrollmentDataApiService from 'data/services/dataApi';

const filterEnrollmentsAction = filterValues => dispatch => {
  EnrollmentDataApiService.fetchEnrollments(filterValues)
    .then((response) => {
      dispatch({
        type: FILTER_ENROLLMENTS_SUCCESS,
        data: response.data.results,
      });
    }).catch((error) => {
      dispatch({
        type: FILTER_ENROLLMENTS_FAILURE,
        error: JSON.parse(error.customAttributes.httpErrorResponseData).message,
      });
    });
};

const unenrollAction = params => dispatch => {
  EnrollmentDataApiService.createUnenrollment(params)
    .then((response) => {
      dispatch({
        type: UNENROLL_SUCCESS,
        data: response.data.result[0].is_active,
        enrollmentId: params.enrollment_id,
      });
    }).catch((error) => {
      dispatch({
        type: UNENROLL_FAILURE,
        error: JSON.parse(error.customAttributes.httpErrorResponseData).message,
      });
    });
};

const clearToastNotification = () => ({
  type: TOAST_NOTIFICATION_CLEAR,
});

const clearFilterAction = () => ({
  type: FILTER_ENROLLMENTS_CLEAR,
});

export {
  filterEnrollmentsAction,
  unenrollAction,
  clearToastNotification,
  clearFilterAction,
};
