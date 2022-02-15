import {
  UNENROLL_SUCCESS,
  UNENROLL_FAILURE,
} from 'data/actions/types';
import { createUnenrollment } from 'data/services/dataApi';
import { getErrorMessages } from 'utils';

const unenrollAction = (data) => async dispatch => {
  try {
    const response = await createUnenrollment(data);
    dispatch({
      type: UNENROLL_SUCCESS,
      data: response.data.result,
    });
  } catch (error) {
    dispatch({
      type: UNENROLL_FAILURE,
      error: getErrorMessages(error),
    });
  }
};

export {
  unenrollAction,
};
