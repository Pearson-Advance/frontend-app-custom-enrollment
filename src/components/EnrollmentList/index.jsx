import React from 'react';
import { useSelector } from 'react-redux';
import { FilterForm } from 'components/FilterForm';
import { EnrollmentsTable } from 'components/EnrollmentsTable';

import './index.scss';
import { Toast } from '@edx/paragon';
import { clearErrorAction } from '../../data/actions/clearError';
import { useDispatch } from 'react-redux';

const EnrollmentList = () => {
  const dispatch = useDispatch();
  const {
    data,
    dataTotalCount,
    pageSize,
    pageIndex,
    error,
  } = useSelector(state => state);
  const closeToast = () => dispatch(clearErrorAction());

  return (
    <section className="enrollments-container">
      <FilterForm
        pageSize={pageSize}
        pageIndex={pageIndex}
        error={error}
      />
      <EnrollmentsTable
        data={data}
        dataTotalCount={dataTotalCount}
        pageSize={pageSize}
        pageIndex={pageIndex}
      />
      <Toast
        onClose={closeToast}
        show={error ? true : false}
      >
        {error}
      </Toast>
    </section>
  );
};

export { EnrollmentList };
