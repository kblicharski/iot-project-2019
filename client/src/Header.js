import React from 'react'
import { Link } from 'react-router-dom'

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Col from 'react-bootstrap/Col'

/*
The header for the whole site.
*/

function Header() {
  return (
    <header>
      <Col>
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
            </Navbar.Collapse>
          </Navbar>
        </div>
      </Col>
    </header>
  )
}

export default Header