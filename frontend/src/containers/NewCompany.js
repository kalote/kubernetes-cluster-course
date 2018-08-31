import React, { Component } from "react";
import { FormGroup, FormControl } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { invokeApi } from "../libs/fetchApi";
import "./NewCompany.css";

export default class NewCompany extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null,
      name: "",
      type: "",
      sector: ""
    };
  }

  validateForm() {
    return this.state.name.length > 0 &&
      this.state.type.length > 0 &&
      this.state.sector.length > 0;
  }

  createCompany(company) {
    return invokeApi({
      type: "company",
      method: "POST",
      body: company
    });
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
      await this.createCompany({
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
      <div className="NewCompany">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="name">
            <FormControl
              onChange={this.handleChange}
              value={this.state.name}
              type="text"
              placeholder="Enter Company name"
            />
          </FormGroup>
          <FormGroup controlId="type">
            <FormControl
              onChange={this.handleChange}
              value={this.state.type}
              type="text"
              placeholder="Enter Company type (Ltd, Corp, ...)"
            />
          </FormGroup>
          <FormGroup controlId="sector">
            <FormControl
              onChange={this.handleChange}
              value={this.state.sector}
              type="text"
              placeholder="Enter Company sector (IT, Automobile, ...)"
            />
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
