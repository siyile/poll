import { savePoll } from "../utils/api";
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const RECEIVE_POLLS = 'RECEIVE_POLLS'
export const ADD_POLL = 'ADD_POLL'

function addPoll(poll){
  return {
    type: ADD_POLL,
    poll
  }
}

export function receivePolls(polls){
  return {
    type: RECEIVE_POLLS,
    polls
  }
}

export function handleAddPolls(poll){
  return (dispatch, getState) => {
    dispatch(showLoading());
    const { authedUser } = getState()
    return savePoll({
      ...poll,
      author: authedUser,
    })
    .then(poll => {
      dispatch(addPoll(poll))
      dispatch(hideLoading())
    })
  }
}

