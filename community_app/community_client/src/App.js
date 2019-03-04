import React, { Component } from 'react';
import './styles/App.css';
import LoginView from './Views/LoginView';
import RegisterationView from './Views/RegisterationView';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import history from './static/history'

class App extends Component {
  render() {
    return (
      <Router forceUpdate>
            <Switch>
              <Route path='/' exact strict component={LoginView} />
              <Route path='/register' exact strict component={RegisterationView} />
            </Switch>
      </Router>

    );
  }
}

export default App;
