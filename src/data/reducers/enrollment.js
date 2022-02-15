import {
  FILTER_ENROLLMENTS_SUCCESS,
  FILTER_ENROLLMENTS_FAILURE,
  FILTER_ENROLLMENTS_CLEAR,
  UNENROLL_SUCCESS,
  UNENROLL_FAILURE,
  CLEAR_ERROR,
} from 'data/actions/types';
import _ from 'lodash';

const initialState = {
  pageSize: 1000,
  pageIndex: 0,
  dataTotalCount: 0,
  data: [],
  error: '',
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
        error: action.error,
        data: [],
        dataTotalCount: 0,
      };
    case FILTER_ENROLLMENTS_CLEAR:
      return {
        ...state,
        data: [],
        dataTotalCount: 0,
      };
    case UNENROLL_SUCCESS:
      const dataCopy = _.cloneDeep(state.data);
      const newData = dataCopy.map(item => {
        if (item.id == action.data.enrollment_id)
          item.is_active = action.data.is_active
        return item
      })

      return {
        ...state,
        data: newData,
      };
    case UNENROLL_FAILURE:
      return {
        ...state,
        dataTotalCount: 0,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: '',
      }
    default: return state;
  }
};

export { enrollmentReducer };
