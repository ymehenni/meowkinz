import React, { Component } from "react";
import "./App.css";
import Chat from "./chat.js";
import Login from "./login.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loggedIn: false,
      failedLogin: false,
      failedRegister: false,
      succeedRegister: false,
      sessionId: 0,
    };
  }
  setUsername = (userInput) => {
    this.setState({user: userInput})
  }
  loggedIn = (state,session) => {
    if(state){
      this.setState({loggedIn: true, failedLogin: false, succeedRegister: false, failedRegister: false, sessionId: session})
    }
    else{
      this.setState({failedLogin: true})
    }
  }
  render() {
    return (
      <div className="App">
        {!this.state.loggedIn && <Login setUser = {this.setUsername} loginState = {this.loggedIn}/>}
        {this.state.loggedIn && <Chat userName = {this.state.user} session={this.state.sessionId}/>}
      </div>
    );
  }
}

export default App;
