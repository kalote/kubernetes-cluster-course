import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem, Grid, Row, Col } from "react-bootstrap";
import { invokeApi } from "../libs/fetchApi";
import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      companies: [],
      employees: []
    };
  }

  async componentDidMount() {
    try {
      const comp = await this.companies();
      const emp = await this.employees();
      this.setState({
        companies: comp,
        employees: emp
      });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  companies() {
    return invokeApi({ type: "company" });
  }

  employees() {
    return invokeApi({ type: "employee" });
  }

  handleClick = event => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute("href"));
  }

  renderCompanyList(companies) {
    return [{}].concat(companies).map(
      (company, i) =>
        i !== 0
          ? <ListGroupItem
            key={company._id}
            href={`/company/${company._id}`}
            onClick={this.handleClick}
            header={company.name}
          >
            {`${company.name}, ${company.type} (${company.sector})`}
          </ListGroupItem>
          : <ListGroupItem
            key="new"
            href="/company/new"
          >
            <h4>
              <b>{"\uFF0B"}</b> Create a new company
              </h4>
          </ListGroupItem>
    );
  }

  renderEmployeeList(employees) {
    return [{}].concat(employees).map(
      (employee, i) =>
        i !== 0
          ? <ListGroupItem
            key={employee._id}
            href={`/employee/${employee.id}`}
            onClick={this.handleClick}
            header={employee.name}
          >
            {`${employee.name}, ${employee.position} (${employee.department})`}
          </ListGroupItem>
          : <ListGroupItem
            key="new"
            href="/employee/new"
          >
            <h4>
              <b>{"\uFF0B"}</b> Create a new employee
              </h4>
          </ListGroupItem>
    );
  }

  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Companies & Employees Application</h1>
          <p>A simple app to create companies & employees</p>
          <Grid>
            <Row className="show-grid">
              <Col xs={12} md={6}>
                <div>
                  <PageHeader>Companies</PageHeader>
                  <ListGroup>
                    {!this.state.isLoading && this.renderCompanyList(this.state.companies)}
                  </ListGroup>
                </div>
              </Col>
              <Col xs={12} md={6}>
                <div>
                  <PageHeader>Employees</PageHeader>
                  <ListGroup>
                    {!this.state.isLoading && this.renderEmployeeList(this.state.employees)}
                  </ListGroup>
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}
