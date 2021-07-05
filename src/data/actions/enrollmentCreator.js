import {
  FILTER_ENROLLMENTS_SUCCESS,
  FILTER_ENROLLMENTS_FAILURE,
  FILTER_ENROLLMENTS_CLEAR,
} from 'data/actions/types';
import { fetchEnrollments } from 'data/services/dataApi';
import { getErrorMessages } from 'utils';

const filterEnrollmentsAction = (pageSize, pageIndex, filters) => async dispatch => {
  try {
    const response = await fetchEnrollments(pageSize, pageIndex, filters);

    dispatch({
      type: FILTER_ENROLLMENTS_SUCCESS,
      filters: filters,
      data: response.data.results,
      dataTotalCount: response.data.count,
      pageCount: response.data.num_pages,
      currentPage: response.data.current_page,
    });
  } catch (error) {
    dispatch({
      type: FILTER_ENROLLMENTS_FAILURE,
      error: getErrorMessages(error),
    });
  }
};

const clearFilterAction = () => ({
  type: FILTER_ENROLLMENTS_CLEAR,
});

export {
  filterEnrollmentsAction,
  clearFilterAction,
};
