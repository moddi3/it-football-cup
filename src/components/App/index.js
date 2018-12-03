import React, { Component } from 'react';
import { FirebaseContext } from '../Firebase';
class App extends Component {
  state = {
    teams: []
  };
  componentDidMount() {
    this.props.firebase.getTeams().then(data => {
      console.log(data);
      this.setState({ teams: data });
    });
  }

  render() {
    return (
      <div className="App">
        <ul>
          {this.state.teams.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default props => (
  <FirebaseContext.Consumer>{firebase => <App firebase={firebase} {...props} />}</FirebaseContext.Consumer>
);
