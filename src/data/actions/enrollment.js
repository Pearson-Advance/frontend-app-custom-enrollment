import {
  FILTER_ENROLLMENTS_REQUEST,
  FILTER_ENROLLMENTS_SUCCESS,
  FILTER_ENROLLMENTS_FAILURE,
  FILTER_ENROLLMENTS_CLEAR,
  UNENROLL_SUCCESS,
  UNENROLL_FAILURE,
  UNENROLL_REQUEST,
  TOAST_NOTIFICATION_CLEAR,
} from 'data/actions/types';

import EnrollmentDataApiService from 'data/services/dataApi';
import { getErrorMessages } from 'utils';

const filterEnrollmentsRequestAction = () => ({
  type: FILTER_ENROLLMENTS_REQUEST,
});

const filterEnrollmentsAction = (pageSize, pageIndex, filterValues) => dispatch => {
  EnrollmentDataApiService.fetchEnrollments(pageSize, pageIndex, filterValues)
    .then((response) => {
      dispatch({
        type: FILTER_ENROLLMENTS_SUCCESS,
        data: response.data.results,
        dataCount: response.data.count,
        pageCount: response.data.num_pages,
        currentPage: response.data.current_page,
      });
    }).catch((error) => {
      dispatch({
        type: FILTER_ENROLLMENTS_FAILURE,
        error: getErrorMessages(error),
      });
    });
};

const unenrollAction = params => dispatch => {
  EnrollmentDataApiService.createUnenrollment(params)
    .then((response) => {
      dispatch({
        type: UNENROLL_SUCCESS,
        data: response.data.result,
        enrollmentId: params.enrollment_id,
      });
    }).catch((error) => {
      dispatch({
        type: UNENROLL_FAILURE,
        error: getErrorMessages(error),
      });
    });
};

const unenrollRequestAction = () => ({
  type: UNENROLL_REQUEST,
});

const clearToastNotification = () => ({
  type: TOAST_NOTIFICATION_CLEAR,
});

const clearFilterAction = () => ({
  type: FILTER_ENROLLMENTS_CLEAR,
});


export {
  filterEnrollmentsRequestAction,
  filterEnrollmentsAction,
  unenrollAction,
  unenrollRequestAction,
  clearToastNotification,
  clearFilterAction,
};
