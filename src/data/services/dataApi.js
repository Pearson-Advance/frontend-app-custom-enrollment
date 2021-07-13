import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

const fetchEnrollments = (pageSize, pageIndex, filters) => {
  // GET request to get data according to the filters set.
  return getAuthenticatedHttpClient().get(`${process.env.ENROLLMENT_API_BASE_URL}/course-enrollment`, {
    params: {
      username_or_email: filters.usernameOrEmail ? filters.usernameOrEmail : null,
      course_id: filters.courseId ? filters.courseId : null,
      external_platform: filters.externalPlatform ? filters.externalPlatform : null,
      is_active: filters.isActive ? filters.isActive : null,
      page_size: pageSize,
      page: pageIndex + 1,
    },
  });
};

export { fetchEnrollments };
