import React from 'react';

import Card from 'react-bootstrap/Card'

import AuthService from './AuthService'
import withAuth from './withAuth';

class Feeding extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      crickets_per_feed: '',
      message: '',
    }
    this.checkStatus = this.checkStatus.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount() {
    let auth = new AuthService()
    let url = `${auth.domain}/app/state`
    
    fetch(
      url,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + auth.getToken()
        }
      }
    )
      .then(auth.checkStatus)
      .then(results => results.json())
      .then((responseJson) => {
        this.setState({
          crickets_per_feed: responseJson['crickets_to_feed']
        })
      })
  }

  handleSubmit(event) {
    event.preventDefault();

    let auth = new AuthService()
    let url = `${auth.domain}/door/open`

    return fetch(
      url, 
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + auth.getToken()
        }
      }
    )
      .then(this.checkStatus)
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          message: "Feed started"
        })
      })
  }

  checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
      return response
    } else if (response.status == 422) {
      this.setState({
        message: 'Feeding already in progress'
      })
    } 
    else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }

  render() {
    return(
      <Card>
        <Card.Header>Start a feeding</Card.Header>
        <Card.Body>
          <Card.Text className="text-center">
            <div className="message">
              <b>{this.state.message}</b>
            </div>
            <p>The current amount of crickets per feed is: {this.state.crickets_per_feed}</p>
            
            <form onSubmit={this.handleSubmit}>
              <button type="submit" className="windows-button">Start a feed</button>
            </form>
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
}

export default withAuth(Feeding)