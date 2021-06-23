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

    const externalPlatform = filters.find(filter => filter.id === 'external_platform')
    const usernameOrEmail = filters.find(filter => filter.id === 'username')
    const courseId = filters.find(filter => filter.id === 'course_id')
    const isActive = filters.find(filter => filter.id === 'is_active')

    const queryParams = {
      username_or_email: usernameOrEmail ? usernameOrEmail.value.trim() : null,
      course_id: courseId ? courseId.value.trim() : null,
      external_platform: externalPlatform ? externalPlatform.value.trim() : null,
      is_active: isActive ? (isActive.value ? isActive.value : null) : null,
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
