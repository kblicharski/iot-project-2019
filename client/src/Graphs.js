import React from 'react';

import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import withAuth from './withAuth';
import AuthService from './AuthService'

const data = [{name: 'Page A', uv: 400}, {name: 'Page B', uv: 500}];

class Graphs extends React.Component {
  componentDidMount() {
    let auth = new AuthService()
    let url = `${auth.domain}/temperatures/most_recent`

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
        let newState = {}
        for (let i = 0; i < responseJson.length; i++) {
          newState[('temp' + (i+1).toString())] = responseJson[i]['value']
          newState[('temp' + (i+1).toString() + 'CreatedAt')] = (new Date(responseJson[i]['created_at'])).toLocaleString('en-US', { hour12: true })
        }
        this.setState(newState)
      })
  }
  
  render() {
    return(
      <Row>
        <Col xs>
          <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
          </LineChart>
        </Col>
      </Row>
    )
  }
}

export default withAuth(Graphs)