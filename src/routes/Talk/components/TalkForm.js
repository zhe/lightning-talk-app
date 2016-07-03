import React, { Component } from 'react'

class TalkForm extends Component {
  constructor () {
    super()
    this.state = { title: '', description: '', username: '', isFormValid: false }
  }

  /* if form is valid, meets the requirement,
     the submit button is enabled,
     user can submit the form to the back-end,
     the onFormSubmit() is passed through props
     from container component */
  handleSubmit = (e) => {
    e.preventDefault()
    const talk = {
      title: this.refs.title.value.trim(),
      description: this.refs.description.value.trim(),
      username: this.refs.username.value.trim()
    }
    this.props.onFormSubmit(talk)
    this.refs.title.value = ''
    this.refs.description.value = ''
    this.refs.username.value = ''
  }

  /* simple form validation
     check if title and username fields are empty
     and their length are valid */
  handleFormValidate = (e) => {
    const title = this.refs.title.value.trim()
    const username = this.refs.username.value.trim()

    if (title.length > 0 && title.length < 30 && username.length > 0 && username.length < 20) {
      this.setState({isFormValid: true})
    }
  }

  render () {
    return (
      <form onChange={this.handleFormValidate} onSubmit={this.handleSubmit}>
        <h4>Submit a lightning talk</h4>
        <div className='form-group'>
          <label htmlFor='inputTitle'>
            Title *
          </label>
          <input
            type='text'
            className='form-control'
            id='inputTitle'
            ref='title'
            placeholder='Title * Required' />
        </div>
        <div className='form-group'>
          <label htmlFor='inputDescription'>
            Description
          </label>
          <input
            type='text'
            className='form-control'
            id='inputDescription'
            ref='description'
            placeholder='Description' />
        </div>
        <div className='form-group'>
          <label htmlFor='inputUsername'>
            Username *
          </label>
          <input
            type='text'
            className='form-control'
            id='inputUsername'
            ref='username'
            placeholder='Username * Required' />
        </div>
        <button type='submit' className='btn btn-primary' disabled={!this.state.isFormValid}>
          Submit
        </button>
      </form>
    )
  }
}

TalkForm.propTypes = {
  onFormSubmit: React.PropTypes.func
}

export default TalkForm
