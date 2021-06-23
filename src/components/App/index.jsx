import React, { useMemo, useCallback, useEffect } from 'react';

import { useTable, useFilters, usePagination } from 'react-table'
import {
  Button, AlertModal, ActionRow, useToggle, Icon, Badge, DropdownFilter, Pagination, Alert, Toast, Spinner
} from '@edx/paragon';
import { Close } from '@edx/paragon/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  unenrollAction,
  unenrollRequestAction,
  filterEnrollmentsRequestAction,
  filterEnrollmentsAction,
  clearToastNotification,
} from 'data/actions/enrollment';

import { FilterForm } from 'components/FilterForm';

import './index.scss';

const App = () => {
  const dispatch = useDispatch();
  const {
    data,
    dataCount,
    pageCount,
    currentPage,
    showNotification,
    notificationMessage,
    loading,
  } = useSelector(state => state);
  const skipPageResetRef = React.useRef()

  const columns = useMemo(() => [
    {
      Header: 'User',
      accessor: 'username',

    },
    {
      Header: 'Email',
      accessor: 'user_email',

    },
    {
      Header: 'Course ID',
      accessor: 'course_id',
    },
    {
      Header: 'Mode',
      accessor: 'mode',
      disableFilters: true,
    },
    {
      Header: 'Active',
      accessor: 'is_active',
      Cell: ({ row }) => <Badge variant={row.values.is_active ? 'success' : 'danger'}>{row.values.is_active ? 'Yes' : 'No'}</Badge>,
      Filter: DropdownFilter,
      filter: 'equals',
      filterChoices: [
        {
          name: 'Yes',
          value: 1,
        },
        {
          name: 'No',
          value: 0,
        },
      ]
    },
    {
      Header: 'Created',
      accessor: 'created',
      disableFilters: true,
    },
    {
      Header: 'External Platform',
      accessor: 'external_platform',
    },
    {
      Header: 'External ID',
      accessor: 'external_course_id',
      disableFilters: true,
    },
    {
      id: 'action',
      Header: 'Options',
      Cell: ({ row }) => {
        const [isOpen, open, close] = useToggle(false);
        return (
          <>
            {
              row.values.is_active &&
              <>
                <Button size="sm" variant="brand" onClick={open}>
                  Unenroll<Icon src={Close} />
                </Button>
                <AlertModal
                  title="Alert!"
                  isOpen={isOpen}
                  onClose={close}
                  footerNode={(
                    <ActionRow>
                      <Button variant="tertiary" onClick={close}>Cancel</Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          dispatch(unenrollRequestAction());
                          dispatch(unenrollAction({
                            enrollment_id: row.original.id,
                            course_id: row.values.course_id,
                            username: row.values.username,
                          }))
                          close();
                        }}
                      >
                        Unenroll
                        </Button>
                    </ActionRow>
                  )}
                >
                  <p>Are you sure you want to unenroll?.</p>
                </AlertModal>
              </>
            }
          </>
        );
      },
    },
  ], [dispatch])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    prepareRow,
    state,
    gotoPage,
    setPageSize,
    setAllFilters,
  } = useTable({
    columns,
    data,
    manualFilters: true,
    initialState: { pageIndex: 0, pageSize: 5 },
    manualPagination: true,
    autoResetPage: !skipPageResetRef.current,
    autoResetFilters: !skipPageResetRef.current,
    pageCount: pageCount,
  },
    useFilters,
    usePagination,
  )

  const { pageIndex, pageSize, filters } = state

  const handleChangePage = useCallback(({ pageIndex, pageSize, filters }) => {
    if (filters.length) {
      dispatch(filterEnrollmentsRequestAction());
      dispatch(filterEnrollmentsAction(pageSize, pageIndex, filters))
    }
  }, [dispatch])

  useEffect(() => { skipPageResetRef.current = false })

  useEffect(() => {
    handleChangePage({ pageIndex, pageSize, filters })
  }, [handleChangePage, pageIndex, pageSize, filters])

  return (
    <div className="enrollment-container">
      <FilterForm
        gotoPage={gotoPage}
        setAllFilters={setAllFilters}
        skipPageResetRef={skipPageResetRef}
      />

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
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            )
          })}
          {
            !dataCount &&
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
      <div className="d-flex justify-content-between">
        <div className="d-flex flex-row ">
          <Pagination
            paginationLabel="pagination"
            pageCount={pageCount}
            currentPage={currentPage}
            onPageSelect={(pageIndex) => gotoPage(pageIndex - 1)}
          />
          <select
            className="page-size-selector"
            defaulvalue={pageSize}
            onChange={e => {
              gotoPage(0)
              setPageSize(Number(e.target.value))
            }}
          >
            {[5, 10, 20, 30, 40, 50].map(size => (
              <option key={size} value={size} >
                Show {size}
              </option>
            ))}
          </select>
        </div>
        {
          loading &&
          <div className="d-flex justify-content-center align-items-center" variant="info">
            Please wait...&nbsp;&nbsp;<Spinner animation="border" variant="primary" />
          </div>
        }
        <span>
          Showing <b>{page.length}</b> of <b>{dataCount}</b>
        </span>
      </div>
      {
        showNotification && (
          <Toast onClose={() => dispatch(clearToastNotification())} show={showNotification}>
            {notificationMessage}
          </Toast>
        )
      }
    </div>
  );
};

export { App };
