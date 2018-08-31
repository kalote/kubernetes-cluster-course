import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import Routes from "./Routes";
import RouteNavItem from "./components/RouteNavItem";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Companies & Employees</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <RouteNavItem key={1} href="/company">
                Create company
              </RouteNavItem>
              <RouteNavItem key={2} href="/employee">
                Create Employee
              </RouteNavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes />
      </div>
    );
  }
}

export default withRouter(App);
