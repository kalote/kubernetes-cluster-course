import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { invokeApi } from "../libs/fetchApi";
import "./Company.css";

export default class Company extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null,
      isDeleting: null,
      name: "",
      type: "",
      sector: "",
      employeeCount: 0
    };
  }

  async componentDidMount() {
    try {
      const comp = await this.getCompany();
      this.setState({
        ...comp
      });
    } catch (e) {
      alert(e);
    }
  }

  getCompany() {
    return invokeApi({
      type: "company",
      urlParams: this.props.match.params.id
    });
  }

  saveCompany(company) {
    return invokeApi({
      type: "company",
      urlParams: this.props.match.params.id,
      method: "PUT",
      body: company
    });
  }

  validateForm() {
    return this.state.name.length > 0 &&
      this.state.type.length > 0 &&
      this.state.sector.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      this.setState({ isLoading: false });
      await this.saveCompany({
        name: this.state.name,
        type: this.state.type,
        sector: this.state.sector
      });
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  render() {
    return (
      <div className="Company">
        {this.state.name &&
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="name">
              <ControlLabel>Name</ControlLabel>
              <FormControl
                onChange={this.handleChange}
                value={this.state.name}
                type="text"
              />
            </FormGroup>
            <FormGroup controlId="type">
              <ControlLabel>Type</ControlLabel>
              <FormControl
                onChange={this.handleChange}
                value={this.state.type}
                type="text"
              />
            </FormGroup>
            <FormGroup controlId="sector">
              <ControlLabel>Sector</ControlLabel>
              <FormControl
                onChange={this.handleChange}
                value={this.state.sector}
                type="text"
              />
            </FormGroup>
            <FormGroup controlId="employeeCount">
              <ControlLabel>Employee Count</ControlLabel>
              <FormControl
                readOnly
                value={this.state.employeeCount}
                type="number"
              />
            </FormGroup>
            <LoaderButton
              block
              bsStyle="primary"
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
              isLoading={this.state.isLoading}
              text="Save"
              loadingText="Saving..."
            />
          </form>}
      </div>
    );
  }
}
