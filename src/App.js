import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';
import { Home, Calculator, Clock, Painter, Todolist } from './pages';

const App = () => (
  <Router>
    <Nav />
    <Switch>
      <div className="content">
        <Route exact path="/" component={Home} />
        <Route path="/calculator" component={Calculator} />
        <Route path="/clock" component={Clock} />
        <Route path="/painter" component={Painter} />
        <Route path="/todolist" component={Todolist} />
      </div>
    </Switch>
  </Router>
);

export default App;
