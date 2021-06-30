import {
  FILTER_ENROLLMENTS_SUCCESS,
  FILTER_ENROLLMENTS_FAILURE,
  FILTER_ENROLLMENTS_CLEAR,
} from 'data/actions/types';

const initialState = {
  pageSize: 1000,
  pageIndex: 0,
  dataTotalCount: 0,
  data: [],
};

const enrollmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_ENROLLMENTS_SUCCESS:
      return {
        ...state,
        data: action.data,
        dataTotalCount: action.dataTotalCount,
      };
    case FILTER_ENROLLMENTS_FAILURE:
      return {
        ...state,
        data: [],
        dataTotalCount: 0,
      };
    case FILTER_ENROLLMENTS_CLEAR:
      return {
        ...state,
        data: [],
        dataTotalCount: 0,
      };
    default: return state;
  }
};

export { enrollmentReducer };
