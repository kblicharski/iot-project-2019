import React from 'react'
import { Link } from 'react-router-dom'

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Col from 'react-bootstrap/Col'

import withAuth from './withAuth';
import history from './history';
import AuthService from './AuthService';
const Auth = new AuthService();

/*
The header for the whole site.
*/

class Header extends React.Component {
  handleLogout(){
    Auth.logout()
    history.replace('/login');
  }

  render() {
    return (
      <header>
        <div id="post">
          <Navbar expand="lg" bg="light">
            <Navbar.Brand><Link to='/'>Auto Terrarium</Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link><Link to='/login'>Login</Link></Nav.Link>
                <Nav.Link><Link to='/dashboard'>Dashboard</Link></Nav.Link>
                <Nav.Link><Link to='/settings'>Settings</Link></Nav.Link>
              </Nav>
              <button type="button" className="mr-sm-2 windows-button" onClick={this.handleLogout.bind(this)}>Logout</button>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </header>
    )
  }
}

export default withAuth(Header)