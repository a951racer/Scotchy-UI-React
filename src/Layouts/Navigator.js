import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { LinkContainer } from "react-router-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Home from '../Components/home'
import Tastings from '../Components/tastings'
import Lists from '../Components/lists'
import Prices from '../Components/prices'
import Settings from '../Components/settings'

class Navigator extends Component {
  render() { 
    return (
      <Router>
        <Navbar className="navbar navbar-dark scotchy-navbar">
          <Navbar.Brand href="/home">Scotchy</Navbar.Brand>
          <Nav className="ml-auto">
            <LinkContainer to="/home">
              <Nav.Item>
                <Nav.Link href="/home">Cabinet</Nav.Link>
              </Nav.Item>
            </LinkContainer>
            <LinkContainer to="/tastings">
              <Nav.Item>
                <Nav.Link href="/tastings">Tastings</Nav.Link>
              </Nav.Item>
            </LinkContainer>
            <LinkContainer to="/lists">
              <Nav.Item>
                <Nav.Link href="/lists">Lists</Nav.Link>
              </Nav.Item>
            </LinkContainer>
            <LinkContainer to="/prices">
              <Nav.Item>
                <Nav.Link href="/prices">Prices</Nav.Link>
              </Nav.Item>
            </LinkContainer>
            <LinkContainer to="/settings">
              <Nav.Item>
                <Nav.Link href="/settings">Settings</Nav.Link>
              </Nav.Item>
            </LinkContainer>
          </Nav>
        </Navbar>
        &nbsp;
        <Container>
          <Row>
              <Col>
                <Switch>
                  <Route exact path="/home">
                    <Home />
                  </Route>
                  <Route exact path="/tastings">
                    <Tastings />
                  </Route>
                  <Route exact path="/lists">
                    <Lists />
                  </Route>
                  <Route exact path="/prices">
                    <Prices />
                  </Route>
                  <Route exact path="/settings">
                    <Settings />
                  </Route>
                </Switch>
            </Col>
          </Row>
        </Container>
      </Router>
    );
  }
}

export default Navigator;
