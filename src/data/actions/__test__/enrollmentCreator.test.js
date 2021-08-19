import * as types from 'data/actions/types';
import * as actions from 'data/actions/enrollmentCreator';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import axios from 'axios';

const mockStore = configureMockStore([thunk]);
const mock = new MockAdapter(axios);

describe('enrollment action', () => {
    const pageSize = 1000;
    const pageIndex = 0;
    let store;
    // set up a fake store for all our tests
    beforeEach(() => {
        store = mockStore();
    });
    afterEach(() => {
        mock.reset();
    });

    describe('When filterEnrollmentAction is called', () => {
        it('calls fetchEnrollments with successful response', async () => {
            const mockResponse = { count: 2 }
            mock.onGet(`${process.env.ENROLLMENT_API_BASE_URL}/course-enrollment`, {})
                .reply(200, mockResponse)
            await store.dispatch(actions.filterEnrollmentsAction(pageSize, pageIndex, {}));
            expect(store.getActions()[0]).toHaveProperty('type', types.FILTER_ENROLLMENTS_SUCCESS);
            expect(store.getActions()[0]).toHaveProperty('dataTotalCount', mockResponse.count);
        })

        it('calls fetchEnrollments with failed response', async () => {
            mock.onGet(`${process.env.ENROLLMENT_API_BASE_URL}/course-enrollment`, {})
                .reply(404, {})
            await store.dispatch(actions.filterEnrollmentsAction(pageSize, pageIndex, {}));
            expect(store.getActions()[0]).toHaveProperty('type', types.FILTER_ENROLLMENTS_FAILURE);
        });
    });

    describe('When clearFilterAction is called', () => {
        const expectedAction = { type: types.FILTER_ENROLLMENTS_CLEAR };

        it('should clear all filters', () => {
            expect(actions.clearFilterAction()).toEqual(expectedAction);
        });
    })
})
