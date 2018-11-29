import React, { Component } from 'react';

import { FirebaseContext } from '../Firebase';

import firebaseConfig from '../Firebase/firebase';

class App extends Component {
  state = {
    matches: []
  };
  componentDidMount() {
    this.props.firebase.getMatches().then(data => {
      console.log(data);
      this.setState({ matches: data });
    });
  }

  render() {
    const APP_ID = process.env.REACT_APP_FACEBOOK_APP_ID;
    const errorStyle = !APP_ID ? { fontStyle: 'italic', color: 'tomato' } : {};

    return (
      <div className="App">
        {this.state.matches.map(item => (
          <div key={item.id}>{item.id}</div>
        ))}
      </div>
    );
  }
}

export default props => (
  <FirebaseContext.Consumer>{firebase => <App firebase={firebase} {...props} />}</FirebaseContext.Consumer>
);
