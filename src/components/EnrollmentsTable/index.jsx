import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTable } from 'react-table';
import { Alert } from '@edx/paragon';
import { COLUMNS } from './columns';

import './index.scss';

const EnrollmentsTable = ({ data, dataTotalCount, pageSize, pageIndex }) => {
  const columns = useMemo(() => COLUMNS, []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
    initialState: { pageIndex: pageIndex, pageSize: pageSize },
  });

  return (
    <div className="enrollments-container">
      <table className="table table-hover" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
          {
            !dataTotalCount &&
            <tr>
              <td colSpan="9">
                <Alert className="d-flex justify-content-center" variant="info">
                  No data to show.
                </Alert>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  );
};

EnrollmentsTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  dataTotalCount: PropTypes.number,
  pageSize: PropTypes.number,
  pageIndex: PropTypes.number,
};

export { EnrollmentsTable };