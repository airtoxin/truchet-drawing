import { combineReducers } from 'redux';

export default combineReducers({
  app(state = 'test', action) {
    return state;
  },
});
