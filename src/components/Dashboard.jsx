import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";

export class Dashboard extends Component {
  state = {
    showAnswered: false
  }

  showAnswered = () => {
    this.setState(() => ({showAnswered: true}))
  }

  showUnanswered = () => {
    this.setState(() => ({showAnswered: false}))
  }

  render() {
    const { showAnswered } = this.state
    const { answered, unanswered } = this.props

    const list = showAnswered === true
      ? answered
      : unanswered

    return (
      <div>
        <div className='dashboard-toggle'>
          <button
            style={{textDecoration: showAnswered === false ? 'underline': null}}
            onClick={this.showUnanswered}
          >
            Unanswered
          </button>
          <span> | </span>
          <button
            style={{textDecoration: showAnswered === true ? 'underline': null}}
            onClick={this.showAnswered}
          >
            Answered
          </button>
        </div>
        <ul className='dashboard-list'>
          {list.map(poll => (
            <li key={poll.id}>
              <Link to={`/polls/${poll.id}`}>
                {poll.question}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ authedUser, polls, users }) => {
  const answers = users[authedUser].answers;

  const answered = answers
    .map(id => polls[id])
    .sort((a, b) => a.timestamp - b.timestamp)

  const unanswered = Object.keys(polls)
    .filter(id => !answers.includes(id))
    .map(id => polls[id])
    .sort((a, b) => a.timestamp - b.timestamp)
  
  return ({
    answered,
    unanswered
  })
}

export default connect(mapStateToProps)(Dashboard)