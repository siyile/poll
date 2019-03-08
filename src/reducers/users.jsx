import { RECEIVE_USERS } from "../actions/users";
import { ADD_POLL } from "../actions/polls";
import { ADD_ANSWER } from "../actions/answers";

export default function users(state = {}, action){
  switch(action.type){
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      }
    case ADD_POLL:
      return {
        ...state,
        [action.poll.author]: {
          ...state[action.poll.author],
          polls: state[action.poll.author].polls.concat(action.poll.id)
        }
      }
    case ADD_ANSWER:{
      const { authedUser, id } = action;
      const user = state[authedUser];
      return {
        ...state,
        [authedUser]: {
          ...user,
          answers: user.answers.concat(id)
        }
      }
    }
    default:
      return state
  }
}