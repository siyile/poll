import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddPolls } from "../actions/polls";

class AddPoll extends Component {
  state = {
    question: '',
    a: '',
    b: '',
    c: '',
    d: ''
  }

  handleInputChange = (e) => {
    const { value, name } = e.target

    this.setState(() => ({[name]: value}))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { question, a, b, c, d } = this.state

    const poll = { question, a, b, c, d }
    
    this.props.history.push('/');
    this.props.dispatch(handleAddPolls(poll))
  }

  isDisabled = () => !(this.state.question 
    && this.state.a 
    && this.state.b 
    && this.state.c 
    && this.state.d)

  render() {
    const { question, a, b, c, d } = this.state
    return (
      <form className="add-form" onSubmit={this.handleSubmit}>
        <h3 style={{marginBottom: 5}}>What is your question?</h3>
        <input 
            type="text"
            value={question}
            onChange={this.handleInputChange}
            name='question'
            className='input'
        />

        <h3>What are the options?</h3>

        <label className='label' htmlFor="a">A.</label>
        <input 
          type="text"
          value={a}
          onChange={this.handleInputChange}
          name='a'
          className='input'
        />
        <label className='label' htmlFor="b">B.</label>
        <input 
          type="text"
          value={b}
          onChange={this.handleInputChange}
          name='b'
          className='input'
        />
        <label className='label' htmlFor="c">C.</label>
        <input 
          type="text"
          value={c}
          onChange={this.handleInputChange}
          name='c'
          className='input'
        />
        <label className='label' htmlFor="d">D.</label>
        <input 
          type="text"
          value={d}
          onChange={this.handleInputChange}
          name='d'
          className='input'
        />

        <button className='btn' type='submit' disabled={this.isDisabled()}>
          Submit!
        </button>

      </form>
    )
  }
}

export default connect()(AddPoll)
