import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    const APP_ID = process.env.REACT_APP_FACEBOOK_APP_ID;
    const errorStyle = !APP_ID ? { fontStyle: 'italic', color: 'tomato' } : {};

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Your APP_ID - <code style={errorStyle}>{APP_ID || 'please check your environments variables'}</code>
          </p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
