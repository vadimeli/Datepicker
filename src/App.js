import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Datepicker from './datepicker/datepicker'

class App extends Component {
  render() {
    return (
      <div className="App">
          <Datepicker/>
      </div>
    );
  }
}

export default App;
