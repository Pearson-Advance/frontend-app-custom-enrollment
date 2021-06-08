import {
  FILTER_ENROLLMENTS_SUCCESS,
  FILTER_ENROLLMENTS_FAILURE,
  FILTER_ENROLLMENTS_CLEAR,
  UNENROLL_SUCCESS,
  UNENROLL_FAILURE,
  TOAST_NOTIFICATION_CLEAR,
} from 'data/actions/types';

const initialState = {
  data: [],
  notificationMessage: null,
  showNotification: false,
};

const SUCCESSFULL_UNENROLL_MESSAGE = 'Successfully unenrolled.';

const enrollmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_ENROLLMENTS_SUCCESS:
      return {
        ...state,
        data: action.data,
      };
    case FILTER_ENROLLMENTS_FAILURE:
      return {
        ...state,
        data: [],
        notificationMessage: action.error,
        showNotification: true,
      };
    case FILTER_ENROLLMENTS_CLEAR:
      return {
        ...state,
        data: [],
      };
    case UNENROLL_SUCCESS:
      state.data.find(item => item.id === action.enrollmentId).is_active = action.data;
      return {
        ...state,
        notificationMessage: SUCCESSFULL_UNENROLL_MESSAGE,
        showNotification: true,
      };
    case UNENROLL_FAILURE:
      return {
        ...state,
        notificationMessage: action.error,
        showNotification: true,
      };
    case TOAST_NOTIFICATION_CLEAR:
      return {
        ...state,
        notificationMessage: null,
        showNotification: false,
      };
    default: return state;
  }
};

export { enrollmentReducer };
