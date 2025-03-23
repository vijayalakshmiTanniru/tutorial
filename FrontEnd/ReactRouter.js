import React from 'react';
  import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
  import Signup from './components/Signup';
  import Login from './components/Login';
  import TaskList from './components/TaskList';
  import PrivateRoute from './components/PrivateRoute'; // You'll create this

  function App() {
      return (
          <Router>
              <Switch>
                  <Route path="/signup" component={Signup} />
                  <Route path="/login" component={Login} />
                  <PrivateRoute path="/" component={TaskList} />
              </Switch>
          </Router>
      );
  }

  export default App;
