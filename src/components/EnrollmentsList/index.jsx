import React from 'react';
import { useSelector } from 'react-redux';
import { FilterForm } from '../FilterForm';
import { EnrollmentsTable } from '../EnrollmentsTable';

const EnrollmentsList = () => {
  const {
    data,
    dataTotalCount,
    pageSize,
    pageIndex,
  } = useSelector(state => state);

  return (
    <div className="enrollments-container">
      <FilterForm
        pageSize={pageSize}
        pageIndex={pageIndex}
      />
      <EnrollmentsTable
        data={data}
        dataTotalCount={dataTotalCount}
        pageSize={pageSize}
        pageIndex={pageIndex}
      />
    </div>
  );
};

export { EnrollmentsList };
