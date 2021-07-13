import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTable } from 'react-table';
import { Alert } from '@edx/paragon';
import { COLUMNS } from './columns';

const EnrollmentsTable = ({
  data, dataTotalCount, pageSize, pageIndex,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns: useMemo(() => COLUMNS, []),
    data: data,
    initialState: { pageIndex, pageSize },
  });

  return (
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
          !dataTotalCount
          && (
            <tr>
              <td colSpan="9">
                <Alert className="d-flex justify-content-center" variant="info">
                  No data to show.
                </Alert>
              </td>
            </tr>
          )
        }
      </tbody>
    </table>
  );
};

EnrollmentsTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  dataTotalCount: PropTypes.number,
  pageSize: PropTypes.number,
  pageIndex: PropTypes.number,
};

EnrollmentsTable.defaultProps = {
  data: [],
  dataTotalCount: 0,
  pageSize: 0,
  pageIndex: 0,
};

export { EnrollmentsTable };
