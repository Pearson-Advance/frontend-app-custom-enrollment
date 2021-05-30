import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

const enrollmentBaseUrl = `${process.env.ENROLLMENT_API_BASE_URL}/api/v1`;

class EnrollmentDataApiService {
  static createUnenrollment(data) {
    // POST request to make an unenrollment
    const url = `${enrollmentBaseUrl}/unenrollment`;
    return getAuthenticatedHttpClient().post(url, data);
  }

  static fetchEnrollments(filters) {
    // GET request to get data according to the filters set
    const queryParams = {
      username_or_email: filters.usernameOrEmail,
      course_id: filters.courseId,
      external_platform: filters.externalPlatform,
    };
    const url = `${enrollmentBaseUrl}/batch-enrollment`;
    return getAuthenticatedHttpClient().get(url, {
      params: queryParams,
    });
  }
}

export default EnrollmentDataApiService;
