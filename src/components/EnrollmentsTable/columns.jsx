import { DropdownFilter, Badge } from '@edx/paragon';
import React from 'react';

export const COLUMNS = [
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
    ],
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
];
