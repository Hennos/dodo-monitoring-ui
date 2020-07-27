import { createStore } from 'redux';

import rootReducer from './rootReducer';

export default function buildStore() {
  const store = createStore(rootReducer);
  return store;
}
