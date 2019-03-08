import { getInitialData } from "../utils/api";
import { receiveUsers } from "./users";
import { receivePolls } from "./polls";
import { setAuthedUser } from "./authedUser";
import { showLoading, hideLoading } from 'react-redux-loading-bar';

const AUTHED_ID = 'dan_abramov'

export function handleInitData(){
  return dispatch => {
    dispatch(showLoading())
    return getInitialData()
      .then(({ users, polls }) => {
        dispatch(receiveUsers(users));
        dispatch(receivePolls(polls));
        dispatch(setAuthedUser(AUTHED_ID));
        dispatch(hideLoading());
      })
  }
}