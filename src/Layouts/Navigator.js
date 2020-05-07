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

import Home from '../Components/Home'
import TastingList from '../Components/TastingList'
import ListList from '../Components/ListList'
import PriceList from '../Components/PriceList'
import Settings from '../Components/Settings'
import PageHeader from '../Components/PageHeader';

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
                    <PageHeader title="Tasting Notes" />
                    <TastingList />
                  </Route>
                  <Route exact path="/lists">
                    <PageHeader title="Lists of Scotches" />
                    <ListList />
                  </Route>
                  <Route exact path="/prices">
                    <PageHeader title="Scotch Prices" />
                    <PriceList />
                  </Route>
                  <Route exact path="/settings">
                    <PageHeader title="App Settings" />
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
