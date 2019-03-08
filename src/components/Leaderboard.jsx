import React from 'react'
import { connect } from 'react-redux'

function Leaderboard({ users }){
    return (
      <ul>
        {users.map(user => {
          return (
            <li className='user' key={user.id}>
              <img src={user.avatar} alt={`$user.name avatar`}/>
              <div>
                <h1>{user.name}</h1>
                <p>{user.answers} Answers</p>
                <p>{user.polls} Polls</p>
              </div>
            </li>
          )
        })}
      </ul>
    )
}

const mapStateToProps = ({ users }) => {
  const usersRes = Object.keys(users)
  .map(id => users[id])
  .map(user => ({
    answers: user.answers.length,
    polls: user.polls.length,
    avatar: user.avatarURL,
    name: user.name,
    id: user.id,
  }))
  .sort((a,b) => (a.answers + a.polls > b.polls + b.answers))

  return { users: usersRes }
}
 
export default connect(mapStateToProps)(Leaderboard)
