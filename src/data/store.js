import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { enrollmentReducer } from 'data/reducers/enrollment';

const store = createStore(
  enrollmentReducer,
  applyMiddleware(thunkMiddleware),
);

export { store };
