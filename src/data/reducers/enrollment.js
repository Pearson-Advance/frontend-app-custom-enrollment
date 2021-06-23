import {
  FILTER_ENROLLMENTS_REQUEST,
  FILTER_ENROLLMENTS_SUCCESS,
  FILTER_ENROLLMENTS_FAILURE,
  FILTER_ENROLLMENTS_CLEAR,
  UNENROLL_REQUEST,
  UNENROLL_SUCCESS,
  UNENROLL_FAILURE,
  TOAST_NOTIFICATION_CLEAR,
} from 'data/actions/types';

const initialState = {
  dataCount: 0,
  pageCount: 0,
  currentPage: 0,
  data: [],
  notificationMessage: null,
  showNotification: false,
  loading: false,
};

const SUCCESSFULL_UNENROLL_MESSAGE = 'Successfully unenrolled.';

const enrollmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_ENROLLMENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FILTER_ENROLLMENTS_SUCCESS:
      return {
        ...state,
        data: action.data,
        dataCount: action.dataCount,
        pageCount: action.pageCount,
        currentPage: action.currentPage,
        loading: false,
      };
    case FILTER_ENROLLMENTS_FAILURE:
      return {
        ...state,
        data: [],
        notificationMessage: action.error,
        showNotification: true,
        dataCount: 0,
        pageCount: 0,
        currentPage: 0,
        loading: false,
      };
    case FILTER_ENROLLMENTS_CLEAR:
      return {
        ...state,
        data: [],
        dataCount: 0,
        pageCount: 0,
        currentPage: 0,
      };
    case UNENROLL_SUCCESS:
      let new_data = state.data.slice(0);
      new_data.find(item => item.id === action.enrollmentId).is_active = action.data.is_active;

      return {
        ...state,
        data: new_data,
        notificationMessage: SUCCESSFULL_UNENROLL_MESSAGE,
        showNotification: true,
        loading: false,
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
    case UNENROLL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    default: return state;
  }
};

export { enrollmentReducer };
