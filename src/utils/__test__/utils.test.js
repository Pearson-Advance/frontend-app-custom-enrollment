import { faItalic } from '@fortawesome/free-solid-svg-icons';
import { getErrorMessages } from 'utils';

describe('Get request error message', () => {
    it('Returns a string from a object', () => {
        const testError = {
            message: 'Test Error Message',
        }
        expect(getErrorMessages(testError)).toEqual(testError.message)
    });

    it('Returns the error message from a validation error on a field', () => {
        const error = {
            response: {
                data: {
                    developer_message: 'User matching query does not exist.',
                },
            },
        };
        expect(getErrorMessages(error)).toEqual('User matching query does not exist.');
    });

    it('Returns the error message from a validation error on multiple fields', () => {
        const error = {
            response: {
                data: {
                    field_errors: {
                        field_one: {
                            developer_message: 'Error message field one.',
                        },
                        field_two: {
                            developer_message: 'Error message field two.',
                        },
                    },
                },
            },
        };
        expect(getErrorMessages(error)).toEqual([
            'Error message field one.',
            'Error message field two.',
        ]);
    });
});
