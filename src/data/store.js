import { createStore } from 'redux';

import history from './history';
import createRootReducer from './reducers';

const store = createStore(
  createRootReducer(history),
);

export default store;
