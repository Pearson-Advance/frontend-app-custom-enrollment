import 'babel-polyfill';
import axios from 'axios';
import { getAuthenticatedHttpClient, getAuthenticatedUser } from '@edx/frontend-platform/auth';

jest.mock('@edx/frontend-platform/auth');
getAuthenticatedHttpClient.mockReturnValue(axios);
getAuthenticatedUser.mockReturnValue({ administrator: false });
