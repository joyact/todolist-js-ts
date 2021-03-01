import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';
import { navs } from './data/navData';

const App = () => {
  const [navOpen, setNavOpen] = useState(false);
  const handleToggle = () => {
    setNavOpen(!navOpen);
  };

  return (
    <Router>
      <Nav open={navOpen} onClick={handleToggle} />
      <Switch>
        <>
          <div id="content">
            <i className="toggle-btn" onClick={handleToggle}></i>
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
};

export default App;
