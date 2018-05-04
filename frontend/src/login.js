import React, { Component } from "react";
import "./App.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      userInput: "",
      passInput: "",
      userRegisterInput: "",
      passRegisterInput: "",
      error: ""
    };
  }
  handleUserChange = event => {
    let value = event.target.value;
    this.setState({ userInput: value });
  };
  handlePassChange = event => {
    let value = event.target.value;
    this.setState({ passInput: value });
  };
  handleSubmit = event => {
    event.preventDefault();
    let username = this.state.userInput;
    let password = this.state.passInput;
    this.props.setUser(username);
    this.setState({ userInput: "", passInput: "" });
    fetch("/login", {
      method: "POST",
      body: JSON.stringify({ user: username, pass: password })
    })
      .then(response => response.json())
      .then(body => {
        this.props.loginState(body.status, body.session);
        this.setState({ error: body.error });
      });
  };
  handleUserRegisterChange = event => {
    let value = event.target.value;
    this.setState({ userRegisterInput: value });
  };
  handlePassRegisterChange = event => {
    let value = event.target.value;
    this.setState({ passRegisterInput: value });
  };
  handleRegisterSubmit = event => {
    event.preventDefault();
    let username = this.state.userRegisterInput;
    let password = this.state.passRegisterInput;
    this.setState({ userRegisterInput: "", passRegisterInput: "" });
    fetch("/register", {
      method: "POST",
      body: JSON.stringify({ user: username, pass: password })
    })
      .then(response => response.json())
      .then(body => {
        this.setState({ error: body.error });
      });
  };
  render() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <nav
          id="chatNav"
          className="navbar navbar-expand-lg navbar-dark bg-primary"
        >
          <img src="/logo.png" />
          <h3 id="logo">MeowKinz </h3>
        </nav>

        <div id="form-group" className="form-group">
          <h4>{this.state.error}</h4>

          <div className="card border-primary mb-3">
            <div className="card-header">Register:</div>
            <div className="card-body">
              <form onSubmit={this.handleRegisterSubmit}>
                <h4 className="card-title">Username:</h4>
                <input
                  style={{ width: "100%" }}
                  placeholder="Username (3 character minimum)"
                  type="text"
                  value={this.state.userRegisterInput}
                  onChange={this.handleUserRegisterChange}
                />
                <br />
                <h4 className="card-title">Password:</h4>
                <input
                  style={{ width: "100%" }}
                  placeholder="Password (5 character minimum)"
                  type="password"
                  value={this.state.passRegisterInput}
                  onChange={this.handlePassRegisterChange}
                />
                <br />
                <input
                  style={{ marginTop: "10px" }}
                  className="btn btn-primary"
                  type="submit"
                />
              </form>
            </div>
          </div>

          <br />
          <div className="card border-primary mb-3">
            <div className="card-header">Login:</div>

            <div className="card-body">
              <form onSubmit={this.handleSubmit}>
                <h4 className="card-title">Username:</h4>
                <input
                  style={{ width: "100%" }}
                  id="inputDefault"
                  placeholder="Username"
                  type="text"
                  value={this.state.userInput}
                  onChange={this.handleUserChange}
                />
                <br />
                <h4 className="card-title">Password:</h4>
                <input
                  style={{ width: "100%" }}
                  placeholder="Password"
                  type="password"
                  value={this.state.passInput}
                  onChange={this.handlePassChange}
                />
                <br />
                <input
                  style={{ marginTop: "10px" }}
                  className="btn btn-primary"
                  type="submit"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
