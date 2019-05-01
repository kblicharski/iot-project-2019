import React from 'react';

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import withAuth from './withAuth';
import AuthService from './AuthService'

class Graphs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount() {
    let auth = new AuthService()

    let end = new Date()
    let start = new Date();
    start.setHours(end.getHours()-24)

    let url = `${auth.domain}/temperatures/?start=${start.valueOf()}&ending=${end.valueOf()}`

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
          data: responseJson
        })
        this.setState(
          { data: this.state.data.map(temp => {
              return {
                  value: temp.value,
                  created_at: ((new Date(temp['created_at'])).toLocaleString('en-US', { hour12: true }))
              }
          })
        });
      })
  }
  
  render() {
    const hStyle = {padding: "20px"};
    return(
      <Row>
        <Col xs>
          <h3 style={hStyle}>Temperature</h3>
          <LineChart width={900} height={500} data={this.state.data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="created_at" minTickGap="5" />
            <YAxis domain={['dataMin-1', 'dataMax+1']} />
            <Tooltip />
          </LineChart>
        </Col>
      </Row>
    )
  }
}

export default withAuth(Graphs)
