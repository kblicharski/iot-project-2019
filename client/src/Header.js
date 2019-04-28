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
        <div className="header-body">
          <Navbar expand="lg">
            <Navbar.Brand><Link to='/'><button className="windows-button title-button">Auto Terrarium</button></Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link><Link to='/dashboard'><button className="windows-button header-button">Dashboard</button></Link></Nav.Link>
                <Nav.Link><Link to='/settings'><button className="windows-button header-button">Settings</button></Link></Nav.Link>
              </Nav>
              <button type="button" className="mr-sm-2 windows-button logout-button" onClick={this.handleLogout.bind(this)}>Logout</button>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </header>
    )
  }
}

export default withAuth(Header)