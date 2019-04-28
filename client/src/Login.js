import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

import AuthService from './AuthService'
import history from './history'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.Auth = new AuthService()
  }

  componentWillMount() {
    // Redirect to home if already logged in
    if(this.Auth.loggedIn()) {
      history.replace('/')
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.Auth.login(this.state.username, this.state.password)
      .then(res => {
        history.replace('/')
      })
      .catch(err => {
        alert(err)
      })
  }

  render() {
    return (
      <Container fluid="true"  className="center">
        <div className="littlebox">
          <Row>
            <Col>
              <h1>Please log in</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username..."
                    value={this.state.username}
                    onChange={this.handleChange}
                    name="username"
                  />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    value={this.state.password}
                    onChange={this.handleChange}
                    type="password"
                    placeholder="Enter password..."
                    name="password"
                  />
                </Form.Group>
                <button className="windows-button" type="submit">
                  Submit
                </button>
              </Form>
            </Col>
          </Row>
        </div>
      </Container>
    )
  }
}

export default Login;