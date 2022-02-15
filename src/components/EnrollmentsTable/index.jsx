import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useTable } from 'react-table';
import { Alert, Toast, useToggle, AlertModal, ActionRow, Button } from '@edx/paragon';
import { getColumns } from 'components/EnrollmentsTable/columns';
import { useDispatch } from 'react-redux';
import { unenrollAction } from 'data/actions/unenrollmentCreator';

const EnrollmentsTable = ({
  data, dataTotalCount, pageSize, pageIndex,
}) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [isOpen, open, close] = useToggle(false)
  const [selectedRow, setRow] = useState({});

  const unenrollData = {
    course_id: selectedRow.course_id,
    username: selectedRow.username,
  };

  const COLUMNS = useMemo(() => getColumns({ open, setRow }), []); //eslint-disable-line react-hooks/exhaustive-deps

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns: COLUMNS,
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
      <Toast
        onClose={() => setShow(false)}
        show={show}
      >
        Successfully Unenrolled !
      </Toast>
      <AlertModal
        title='Are you sure you want to unenroll?'
        isOpen={isOpen}
        onClose={close}
        footerNode={(
          <ActionRow>
            <Button variant="tertiary" onClick={close}>cancel</Button>
            <Button
              variant="primary"
              onClick={() => {
                setShow(true);
                dispatch(unenrollAction(unenrollData));
                close()
              }}>
              Submit
            </Button>
          </ActionRow>
        )}>
        <p>
          Once submitted the user will be unenrolled from the course.
        </p>
      </AlertModal>
    </table >
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
