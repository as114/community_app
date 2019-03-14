import React, { Component } from 'react';
import './styles/App.css';
import LoginView from './Views/LoginView';
import RegisterationView from './Views/RegisterationView';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeView from './Views/HomeView';
import LoginHeader from './Components/LoginHeader';
import IssuesView from './Views/IssuesView';
import HomeHeader from './Components/HomeHeader';
import AboutView from './Views/AboutView';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <LoginHeader/>
          <HomeHeader/>
            <Switch>
              <Route path='/' exact strict component={LoginView} />
              <Route path='/home' exact strict component={HomeView} />
              <Route path='/open_issues' exact strict component={IssuesView}/>
              <Route path='/about' exact strict component={AboutView}/>
              <Route path='/register' exact strict component={RegisterationView} />
          </Switch>
        </div>
      </Router>
    
    );
  }
}

export default App;
