import React from 'react';
import { useSelector } from 'react-redux';
import { FilterForm } from 'components/FilterForm';
import { EnrollmentsTable } from 'components/EnrollmentsTable';

import './index.scss';

const EnrollmentList = () => {
  const {
    data,
    dataTotalCount,
    pageSize,
    pageIndex,
  } = useSelector(state => state);

  return (
    <section className="enrollments-container">
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
    </section>
  );
};

export { EnrollmentList };
