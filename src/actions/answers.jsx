import { savePollAnswer } from "../utils/api";
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const ADD_ANSWER = 'ADD_ANSWER'

function addAnswer({ id, authedUser, answer }){
  return {
    type: ADD_ANSWER,
    id,
    authedUser,
    answer
  }
}

export function handleAddAnswer(answerData){
  return dispatch => {
    dispatch(showLoading());
    return savePollAnswer(answerData)
      .then(() => dispatch(addAnswer(answerData)))
      .then(() => dispatch(hideLoading()))
  }
}