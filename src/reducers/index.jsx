import { combineReducers } from "redux";
import users from './users'
import polls from './polls'
import authedUser from './authedUser'
import { loadingBarReducer } from 'react-redux-loading-bar'

export default combineReducers({
  users, 
  polls, 
  authedUser,
  loadingBar: loadingBarReducer
})