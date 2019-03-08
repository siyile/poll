import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPercentage } from "../utils/helpers";
import { handleAddAnswer } from '../actions/answers';

const getVotesKeys = () => ['aVotes', 'bVotes', 'cVotes', 'dVotes']
class Poll extends Component {
  handleAnswer = (answer) => {
    const {poll, authedUser, dispatch} = this.props
    this.answer = true;
    dispatch(handleAddAnswer({
      id: poll.id,
      authedUser,
      answer
    }))
  }
  render() {
    const { vote, poll, avatar} = this.props
    if (poll === null){
      return <p>This poll does not exist.</p>
    }
    const total = getVotesKeys().reduce((total, key) => total + poll[key].length, 0)

    return (
      <div className='poll-container'>
        <h1 className='question' >{poll.question}</h1>
        <div className='poll-author'>
          By <img src={avatar} alt="user avatar"/>
        </div>
        <ul>
          {
            ['aText', 'bText', 'cText', 'dText'].map(key => {
              const count = poll[key[0] + 'Votes'].length
              return <li
                key={key}
                className={`option ${vote === key[0]?'chosen': ''}`}
                onClick={() => {
                  if ( vote === null  && !this.answer)
                    this.handleAnswer(key[0])
                }}
              >
                {
                  vote === null
                  ? poll[key]
                  : <div className="result">
                    <span>{poll[key]}</span>
                    <span>{getPercentage(count, total)}% ({count})</span>
                  </div>
                }
              </li>
            })
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ( { authedUser, users, polls } , { match }) => {
  const { id } = match.params
  const poll = polls[id]

  if (!poll) {
    return {
      poll: null
    }
  }

  const vote = getVotesKeys().reduce((vote, key) => {
    if (vote !== null){
      return vote[0]
    }

    return poll[key].includes(authedUser)
      ? key
      : vote
  }, null)

  return {
    vote,
    poll,
    authedUser,
    avatar: users[poll.author].avatarURL
  }
}

export default connect(mapStateToProps)(Poll)
