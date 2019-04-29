import React from 'react';

import Card from 'react-bootstrap/Card'

import withAuth from './withAuth'
import AuthService from './AuthService'

class FeedingHistory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      feedings: []
    }
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount() {
    let auth = new AuthService()
    let url = `${auth.domain}/all_feedings`

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
          feedings: responseJson
        })
      })
  }

  render() {
    var feedingsList = this.state.feedings.map(function(feeding){
      return(
        <Card>
          <Card.Body>
            <Card.Text className="text-center">
              Feeding
              <p>Number of crickets fed: + {feeding.crickets_fed}</p>
            </Card.Text>
          </Card.Body>
          <Card.Footer className="footer-text">
            Last updated at {feeding.created_at}
          </Card.Footer>
        </Card>
      )
    })
    
    return(
      <>    
        {feedingsList}
      </>
    )
  }
}

export default withAuth(FeedingHistory)