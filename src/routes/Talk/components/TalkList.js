import React, { Component } from 'react'

class TalkList extends Component {
  constructor (props) {
    super(props)
    this.handleVote = this.handleVote.bind(this)
  }

  handleVote (vote, talk) {
    event.preventDefault()
    if (!vote) return
    if (vote === 'up' || vote === 'down') {
      this.props.onVote(vote, talk)
    } else {
      return
    }
  }

  render () {
    return <div>
             {this.props.talks.map(this.renderTalkItem)}
           </div>
  }

  renderTalkItem = (talk, i) => {
    return <div className='row' key={i}>
              <h3>{talk.title}</h3>
              <p className='lead'>
                  {talk.description}
              </p>
              <div className='row'>
                <div className='col-xs-6 text-right'>
                  <strong>Speaker</strong>
                </div>
                <div className='col-xs-6 text-left'>
                  {talk.username}
                </div>
              </div>
              <div className='row'>
                <div className='col-xs-6 text-right'>
                  <p><strong>Rating</strong></p>
                </div>
                <div className='col-xs-6 text-left'>
                  <span className='text-success'>{talk.rating}</span>
                </div>
              </div>
              <div className='btn-group'>
                <a className='btn btn-primary' title='Like' onClick={() => this.handleVote('up', talk)}>
                  <span className='glyphicon glyphicon-thumbs-up' ariaHidden='true'></span>
                </a>
                <a className='btn btn-default' title='Dislike' onClick={() => this.handleVote('down', talk)}>
                  <span className='glyphicon glyphicon-thumbs-down' ariaHidden='true'></span>
                </a>
              </div>
              <hr />
           </div>
  }
}

TalkList.propTypes = {
  onVote: React.PropTypes.func,
  talks: React.PropTypes.array
}

export default TalkList
