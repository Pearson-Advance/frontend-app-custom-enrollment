import * as actionTypes from 'data/actions/types';
import * as actions from 'data/actions/enrollmentCreator';
import { enrollmentReducer } from 'data/reducers/enrollment';

describe('Enrollment reducers', () => {
    const pageSize = 1000;
    const pageIndex = 0;
    let initialState;

    beforeEach(() => {
        initialState = {
            pageSize: pageSize,
            pageIndex: pageIndex,
            dataTotalCount: 0,
            data: [],
        };
    })

    it('should return the initial state', () => {
        expect(enrollmentReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle FILTER_ENROLLMENTS_CLEAR', () => {
        expect(enrollmentReducer(undefined, actions.clearFilterAction()))
            .toEqual(initialState);
    });

    it('should handle FILTER_ENROLLMENTS_SUCCESS', () => {
        const successAction = {
            type: actionTypes.FILTER_ENROLLMENTS_SUCCESS,
            data: [
                { id: 1, username: "username1" },
                { id: 2, username: "username2" },
            ],
            dataTotalCount: 2,
        }

        expect(enrollmentReducer(initialState, successAction))
            .toEqual({ ...initialState, data: successAction.data, dataTotalCount: 2 })
    })

    it('should handle FILTER_ENROLLMENTS_FAILURE', () => {
        expect(enrollmentReducer(initialState, { type: actionTypes.FILTER_ENROLLMENTS_FAILURE }))
            .toEqual(initialState)
    })
})
