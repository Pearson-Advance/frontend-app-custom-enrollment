import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
const enrollmentBaseUrl = `${process.env.ENROLLMENT_API_BASE_URL}/api/v1`;

class EnrollmentDataApiService {
  static createUnenrollment(data) {
    // POST request to make an unenrollment
    const url = `${enrollmentBaseUrl}/unenrollment`;
    return getAuthenticatedHttpClient().post(url, data);
  }

  static fetchEnrollments(pageSize, pageIndex, filters) {
    // GET request to get data according to the filters set
    const queryParams = {
      username_or_email: filters.usernameOrEmail ? filters.usernameOrEmail : null,
      course_id: filters.courseId ? filters.courseId : null,
      external_platform: filters.externalPlatform ? filters.externalPlatform : null,
      is_active: filters.isActive ? (filters.isActive ? filters.isActive : null) : null,
      page_size: pageSize,
      page: pageIndex + 1,
    };
    const url = `${enrollmentBaseUrl}/course-enrollment`;
    return getAuthenticatedHttpClient().get(url, {
      params: queryParams,
    });
  }
}

export default EnrollmentDataApiService;
