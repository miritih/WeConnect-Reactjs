import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Weconnect React App</h1>
        </header>
        <p className="App-intro">
          This app will consume the Weconnect Flask Api
        </p>
      </div>
    );
  }
}
export default App;
