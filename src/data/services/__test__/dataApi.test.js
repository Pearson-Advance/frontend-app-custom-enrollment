import axios from 'axios';
import { fetchEnrollments } from 'data/services/dataApi';

const filters = {
    usernameOrEmail: 'username-or-email',
    courseId: 'course-id',
    externalPlatform: 'external-platform',
    isActive: true,
};

describe('Service tests', () => {
    const get = jest.spyOn(axios, 'get');
    const pageSize = 1000;
    const page = 1;
    const params = {
        username_or_email: filters.usernameOrEmail,
        course_id: filters.courseId,
        external_platform: filters.externalPlatform,
        is_active: filters.isActive,
        page_size: pageSize,
        page: page,
    };

    const enrollments = [
        { id: 1, username: "username1" },
        { id: 2, username: "username2" },
    ];

    it('Should have a 200 response with enrollments data', async () => {
        get.mockResolvedValueOnce({ response: { status: 200 }, data: enrollments });
        const response = await fetchEnrollments(pageSize, page - 1, filters);
        expect(response.data).toEqual(enrollments);
        expect(get).toHaveBeenCalledWith(`${process.env.ENROLLMENT_API_BASE_URL}/course-enrollment`, { params: params });
    });


    it('Should have a 404 response with a error message', async () => {
        const errorMessage = { "developer_message": "User matching query does not exist." };
        get.mockResolvedValueOnce({ response: { status: 404 }, data: errorMessage });
        const response = await fetchEnrollments(pageSize, page - 1, filters);
        expect(response.data).toEqual(errorMessage);
        expect(get).toHaveBeenCalledWith(`${process.env.ENROLLMENT_API_BASE_URL}/course-enrollment`, { params: params });
    });
});
