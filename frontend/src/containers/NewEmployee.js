import React, { Component } from "react";
import { FormGroup, FormControl } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { invokeApi } from "../libs/fetchApi";
import "./NewEmployee.css";

export default class NewEmployee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null,
      name: "",
      email: "",
      position: "",
      department: "",
      companyId: "",
      companyName: "",
      companies: []
    };
  }

  async componentDidMount() {
    try {
      const comp = await this.companies();
      this.setState({
        companies: comp
      });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  companies() {
    return invokeApi({ type: "company" });
  }

  validateForm() {
    return this.state.name.length > 0 &&
      this.state.email.length > 0 &&
      this.state.position.length > 0 &&
      this.state.department.length > 0 &&
      this.state.companyName.length > 0;
  }

  createEmployee(employee) {
    return invokeApi({
      type: "employee",
      method: "POST",
      body: employee
    });
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  onTargetSelect = e => {
    const vals = e.target.value.split("_");
    this.setState({
      companyId: vals[0],
      companyName: vals[1]
    })
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await this.createEmployee({
        name: this.state.name,
        email: this.state.email,
        position: this.state.position,
        department: this.state.department,
        companyId: this.state.companyId,
        companyName: this.state.companyName
      });
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  render() {
    return (
      <div className="NewEmployee">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="name">
            <FormControl
              onChange={this.handleChange}
              value={this.state.name}
              type="text"
              placeholder="Enter Employee full name"
            />
          </FormGroup>
          <FormGroup controlId="email">
            <FormControl
              onChange={this.handleChange}
              value={this.state.email}
              type="email"
              placeholder="Enter Employee email"
            />
          </FormGroup>
          <FormGroup controlId="position">
            <FormControl
              onChange={this.handleChange}
              value={this.state.position}
              type="text"
              placeholder="Enter Employee position"
            />
          </FormGroup>
          <FormGroup controlId="department">
            <FormControl
              onChange={this.handleChange}
              value={this.state.department}
              type="department"
              placeholder="Enter Employee department"
            />
          </FormGroup>
          <FormGroup controlId="company">
            <FormControl
              componentClass="select"
              placeholder="Select a Company"
              onChange={this.onTargetSelect.bind(this)}>
              <option value="0">Select a company</option>
              {this.state.companies.map(cpny =>
                <option
                  key={cpny._id}
                  value={`${cpny._id}_${cpny.name}`}>
                  {cpny.name}
                </option>
              )}
            </FormControl>
          </FormGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Create"
            loadingText="Creating..."
          />
        </form>
      </div>
    );
  }
}
