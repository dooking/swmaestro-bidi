import { createStore, combineReducers, applyMiddleware } from 'redux';

import ReduxThunk from 'redux-thunk';
import userReducer from '../User';
import proposalReducer from '../Proposal';
import bidReducer from '../Bid';
import matchingReducer from '../Matching';
const rootReducer = combineReducers({
  user: userReducer,
  proposal: proposalReducer,
  bid: bidReducer,
  matching: matchingReducer,
});
const globalStore = () => {
  return createStore(rootReducer, applyMiddleware(ReduxThunk));
};
export default globalStore;
