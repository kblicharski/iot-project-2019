import React from 'react';

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
            The most recent feeding is:
            <div className="reading-text">
              {this.state.cricketsFed}
              {this.state.status}
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