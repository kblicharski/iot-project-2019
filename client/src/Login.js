import React from 'react';

import AuthService from './AuthService'

import history from './history';

function Login() {
  return (
    <div>
      login!!!!!
      <LoginForm />
    </div>
  )
}

class LoginForm extends React.Component {
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

  componentWillMount(){
    if(this.Auth.loggedIn())
      history.replace('/');
}

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit (event) {
    event.preventDefault();
    this.Auth.login(this.state.username, this.state.password)
      .then(res => {
        history.replace('/');
      })
      .catch(err => {
        alert(err);
      })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        Username:
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handleChange}
        />

        Password:
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <input type="submit" value="Submit"/>
    </form>
    )
  }
}



export default Login;