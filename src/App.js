import React, { Component } from 'react';
import { HashRouter, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

class App extends Component {
  render() {
    return (
      <main>
        <Switch>
          <HashRouter exact path="/" component={ Login } />
          <HashRouter path="/carteira" component={ Wallet } />
        </Switch>
      </main>
    );
  }
}

export default App;
