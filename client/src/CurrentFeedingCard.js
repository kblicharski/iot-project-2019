import React from 'react';

import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'

import AuthService from './AuthService'

class CurrentFeedingCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cricketsFed: '',
      status: '',
      created_at: '',
      has_active: false,
    }
    this.componentDidMount= this.componentDidMount.bind(this)
  }
  
  componentDidMount() {
    let auth = new AuthService()
    let url = `${auth.domain}/active_feeding`

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
        if (responseJson === null) {
          this.setState({
            has_active: false,
          })
        } else {
          this.setState({
            created_at: (new Date(responseJson['created_at'])).toLocaleString('en-US', { hour12: true }),
            cricketsFed: responseJson['crickets_fed'],
            status: responseJson['status'],
            has_active: true,
          })
        }
      })
  }

  render() {
    let content
    if (this.state.has_active) {
      content = <>
        Active feeding
        <div className="reading-text">
          Crickets fed: {this.state.cricketsFed}
        </div>
        <div className="reading-text">
          Status: {this.state.status}
        </div>
      </>
    } else {
      content = <>No active feeding currently.</>
    }

    return (
      <Card>
        <Card.Header><i class="fas fa-bug"></i> Active Feeding</Card.Header>
        <Card.Body>
          <Card.Text className="text-center">
           {content}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="footer-text">
          Last updated at {this.state.created_at}
        </Card.Footer>
      </Card>
    )
  }
}

export default CurrentFeedingCard