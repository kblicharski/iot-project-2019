import React from 'react';

import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'

import AuthService from './AuthService'

class LastFeedingCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cricketsFed: '',
      status: '',
      created_at: '',
    }
    this.componentDidMount= this.componentDidMount.bind(this)
  }
  
  componentDidMount() {
    let auth = new AuthService()
    let url = `${auth.domain}/most_recent_feeding`

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
        console.log(responseJson)
        this.setState({
          created_at: (new Date(responseJson['created_at'])).toLocaleString('en-US', { hour12: true }),
          cricketsFed: responseJson['crickets_fed'],
          status: responseJson['status']
        })
      })
  }

  render() {
    return (
      <Card>
        <Card.Header>Feeding</Card.Header>
        <Card.Body>
          <Card.Text className="text-center">
            <p>Data for the most recent feeding</p>
            <div className="reading-text">
              Crickets fed: {this.state.cricketsFed}
            </div>
            <div className="reading-text">
              Status: {this.state.status}
            </div>
            <div>
              <button className="windows-button">
              <Link to='/feeding_history'><button className="windows-button header-button">See more feeding history</button></Link>
              </button>
            </div>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="footer-text">
          Last updated at {this.state.created_at}
        </Card.Footer>
      </Card>
    )
  }
}

export default LastFeedingCard