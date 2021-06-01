import React from 'react';

import {
  Button, DataTable, AlertModal, ActionRow, useToggle,
} from '@edx/paragon';

const Table = ({ data, handleClickFilter, handleClickUnenroll }) => {
  const enrollmentTableColumns = [
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
    },
    {
      Header: 'Active',
      accessor: 'is_active',
    },
    {
      Header: 'Created',
      accessor: 'created',
    },
    {
      Header: 'External Platform',
      accessor: 'external_platform',
    },
    {
      Header: 'External ID',
      accessor: 'external_course_id',
    },
  ];

  return (
    <DataTable
      itemCount={data.length}
      isSortable
      isPaginated
      initialState={{
        pageSize: 5,
        pageIndex: 0,
      }}
      data={data}
      columns={enrollmentTableColumns}
      tableActions={[
        {
          className: 'btn-secondary',
          buttonText: 'Filter',
          handleClick: handleClickFilter,
        },
      ]}
      additionalColumns={[
        {
          id: 'action',
          Header: 'Options',
          Cell: ({ row }) => {
            const [isOpen, open, close] = useToggle(false);
            return (
              <>
                {
                  row.values.is_active === 'Yes' && (
                    <div>
                      <Button
                        variant="brand"
                        onClick={open}
                      >
                        Unenroll
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
                                const unenrollData = {
                                  enrollment_id: row.original.id,
                                  course_id: row.values.course_id,
                                  username: row.values.username,
                                };
                                handleClickUnenroll(unenrollData);
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
                    </div>
                  )
                }
              </>
            );
          },
        },
      ]}
    >
      <DataTable.TableControlBar />
      <DataTable.Table />
      <DataTable.EmptyTable content="No results found" />
      <DataTable.TableFooter />
    </DataTable>
  );
};

export { Table };
