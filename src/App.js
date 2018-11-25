import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    const errorStyle = {
      color: 'tomato'
    };

    const APP_ID = process.env.REACT_APP_FACEBOOK_APP_ID || (
      <samp style={errorStyle}>
        <i>please check your environments variables</i>
      </samp>
    );
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          Your APP_ID - {APP_ID}
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
