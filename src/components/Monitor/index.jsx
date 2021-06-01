import React from 'react';

import {
  Spinner, Badge, DataTable, TextFilter, CheckboxFilter, Tabs, Tab, Card, Alert,
} from '@edx/paragon';

import './index.scss';

const StatusMonitor = ({ data, showLoading }) => (
  <div className="report-wrapper m-5">
    {
      !data
      && (
        <>
          {
            showLoading
            && (
              <>
                <Spinner className="mr-2" animation="grow" variant="primary" />
                <Spinner className="mr-2" animation="grow" variant="primary" size="sm" />
                <h4>Loading</h4>
                <Spinner className="ml-2" animation="grow" variant="primary" size="sm" />
                <Spinner className="ml-2" animation="grow" variant="primary" />
              </>
            )
          }
          {
            !showLoading
            && (
              <>
                <Alert variant="success">
                  <Alert.Heading>Hey, nice to see you</Alert.Heading>
                  <p>
                    Welcome to the batch enrollment view, you can enroll users with
                    a comma separated list of emails, also make as many enrollmets as you need.
                  </p>
                  <hr />
                  <p className="mb-0">
                    In this section you will be able to view all enrollments status once the form
                    is submited.
                  </p>
                </Alert>
              </>
            )
          }
        </>
      )
    }
    {
      data
      && (
        <>
          <h3 className="title-wrapper">Enrollment Report</h3>
          <Tabs defaultActiveKey="summary" id="uncontrolled-tab-example">
            <Tab eventKey="summary" title="Summary">
              <Card className="lead">
                <Card.Body>
                  <Card.Text>
                    Course Id: <b>{data.course_id}</b> <br />
                    Course mode: <b>{data.course_mode}</b><br />
                    Total users to enroll: <Badge variant="dark">{data.enrollments.length}</Badge><br />
                    Successful enrollments: <Badge variant="success">{data.enrollments.filter(item => item.status === 'SUCCESS').length}</Badge><br />
                    Failed enrollments: <Badge variant="warning">{data.enrollments.filter(item => item.status === 'FAILURE').length}</Badge><br />
                  </Card.Text>
                </Card.Body>
              </Card>

            </Tab>
            <Tab eventKey="status" title="Enrollments">
              <DataTable
                isFilterable
                isSortable
                isPaginated
                initialState={{
                  pageSize: 10,
                  pageIndex: 0,
                }}
                defaultColumnValues={{ Filter: TextFilter }}
                itemCount={data.enrollments.length}
                data={data.enrollments}
                columns={[
                  {
                    Header: 'Email',
                    accessor: 'email',

                  },
                  {
                    Header: 'Message',
                    accessor: 'message',
                  },
                  {
                    Header: 'Status',
                    accessor: 'status',
                    Filter: CheckboxFilter,
                    filterChoices: [
                      {
                        name: 'SUCCESS',
                        number: data.enrollments.filter(item => item.status === 'SUCCESS').length,
                        value: 'SUCCESS',
                      },
                      {
                        name: 'FAILURE',
                        number: data.enrollments.filter(item => item.status === 'FAILURE').length,
                        value: 'FAILURE',
                      },
                    ],
                    Cell: ({ row }) => <Badge variant={row.values.status === 'FAILURE' ? 'warning' : 'success'}>{row.values.status}</Badge>,
                  },
                ]}
              >
                <DataTable.TableControlBar />
                <DataTable.Table />
                <DataTable.EmptyTable content="Enrollments status previewer." />
                <DataTable.TableFooter />
              </DataTable>
            </Tab>
          </Tabs>
        </>
      )
    }
  </div>
);

export { StatusMonitor };
