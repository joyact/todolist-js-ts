import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';
import { navs } from './data/navData';

const App = () => (
  <Router>
    <Nav />
    <Switch>
      <>
        <div id="content">
          {navs.map((navItem) => (
            <Route
              exact
              key={navItem.id}
              path={navItem.path}
              component={navItem.component}
            />
          ))}
        </div>
      </>
    </Switch>
  </Router>
);

export default App;
