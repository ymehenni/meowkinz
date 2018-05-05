import React, { Component } from "react";
import "./App.css";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatInput: "",
      chats: [],
      user: this.props.userName,
      sessionId: this.props.session,
      userData: {}
    };
  }
  componentWillUnmount = () => {}
  componentWillReceiveProps = props => {
    this.setState({ user: props.userName, sessionId: props.session });
  };
  componentDidMount = () => {
    let loadItems = () =>
      fetch("/items", {
        method: "POST",
        body: JSON.stringify({
          session: this.state.sessionId,
          user: this.state.user
        })
      })
        .then(response => response.json())
        .then(body => this.setState({ chats: body }));
    loadItems();

    let loadActiveUsers = () =>
      fetch("/lastLogin", {
        method: "POST"
      })
        .then(response => response.json())
        .then(body => this.setState({ userData: body }));
    loadActiveUsers();

    let loadAll = () => {
      loadItems();
      loadActiveUsers();
    };
   setInterval(loadAll, 1000);
  };
  handleChatChange = event => {
    let value = event.target.value;
    this.setState({ chatInput: value });
  };
  handleSubmit = event => {
    event.preventDefault();
    fetch("/submitMessage", {
      method: "POST",
      body: JSON.stringify({
        user: this.state.user,
        message: this.state.chatInput,
        session: this.state.sessionId
      })
    })
      .then(response => response.json())
      .then(body => this.setState({ chats: body }));
    this.setState({ chatInput: "" });
  };
  showChat = arr => {
    return arr.map((x, i) => {
      return (
        <li
          className="alert alert-dismissible alert-primary"
          style={{ listStyleType: "none" }}
          key={i}
        >
          {<strong>{x.user}:</strong>} {x.message}{" "}
        </li>
      );
    });
  };
  showActive = (obj) => { // eslint-disable-next-line 
    return Object.keys(obj).map((k, i) => {
      if (obj[k].lastLogin > Date.now() - 300000) {
        return (
          <li 
            className="badge badge-success"
            key={i}
            style={{ listStyleType: "none", width: "100%" }}
          >
            {" "}
            {k}{" "}
          </li>
        );
      }
    });
  };
  render() {
    return (
      <div id="upperChatContainer">
        <nav
          id="chatNav"
          className="navbar navbar-expand-lg navbar-dark bg-primary"
        >
              <img src="/logo.png" alt="kitty logo"></img>
        <h3 id='logo' >
            MeowKinz{" "}
          </h3>
        </nav>

        <div id="activeUsers" className="activeUsers">
          <h4 className="card-title">Active Users:</h4>
          <ul style={{ padding: "0px" }}>
            {this.showActive(this.state.userData)}{" "}
          </ul>
        </div>

        <div id="chatContainer">
          <div className="chat">
            <ul id="chatList" className="list-group">
              {this.showChat(this.state.chats)}
            </ul>
          </div>

          <form
            autoComplete="off"
            id="chatForm"
            className="form-group"
            onSubmit={this.handleSubmit}
          >
            <input
              className="form-control"
              placeholder="Message"
              id="inputDefault"
              type="text"
              value={this.state.chatInput}
              onChange={this.handleChatChange}
            />
            <input
              id="submitButton"
              className="btn btn-primary"
              type="submit"
              value="Send"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Chat;
