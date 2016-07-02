import React, { Component } from 'react'
import 'es6-promise'
import fetch from 'isomorphic-fetch'
// presentational components
import TalkList from '../components/TalkList'
import TalkForm from '../components/TalkForm'

class TalkContainer extends Component {
  constructor () {
    super()
    this.state = { talks: [] } // initial state
  }

  handleFormSubmit = (talk) => {
    let talks = this.state.talks

    // submit POST the form data to back-end database
    fetch('http://0.0.0.0:3001/api/talks', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(talk)
    })
    .then(response => response.json())
    .then(json => {
      // update the state with new talk,
      // sort the list of talks by the rating of talk
      // in descending order
      const sorted = talks.concat([json]).sort((a, b) => b.rating - a.rating)
      this.setState({ talks: sorted })
    }, error => {
      console.log(error)
    })
  }

  handleVote = (vote, talk) => {
    let talks = this.state.talks

    let votedTalks = talks.map(item => {
      if (item.id === talk.id) {
        vote === 'up' ? item.rating + 1 : item.rating - 1
        return item
      } else {
        return item
      }
    })

    this.setState({ talks: votedTalks })

    const data = {
      rating: vote === 'up' ? talk.rating + 1 : talk.rating - 1
    }

    // update the rating for
    fetch(`http://0.0.0.0:3001/api/talks/${talk.id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(json => {
      // update the talks with the reponse data
      const updatedTalks = talks.map(item => {
        if (item.id === json.id) {
          return json
        } else {
          return item
        }
      }, error => {
        console.log(error)
      })

      // sort the talks by rating in decending order
      const sortedTalks = updatedTalks.sort((a, b) => b.rating - a.rating)
      // set the new state
      this.setState({ talks: sortedTalks })
    })
  }

  componentDidMount () {
    // fetch GET the talks when component is initialized
    fetch('http://0.0.0.0:3001/api/talks')
      .then(response => response.json())
      .then(json => {
        // sort the list of talks by the rating of talk
        // in descending order
        const sorted = json.sort((a, b) => b.rating - a.rating)
        this.setState({ talks: sorted })
      })
  }

  render () {
    return <div>
             <TalkList {...this.state} onVote={this.handleVote} />
             <TalkForm onFormSubmit={this.handleFormSubmit} />
           </div>
  }
}

export default TalkContainer
