import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <nav>
    <h1 className="nav-logo">wediz</h1>
    <ul>
      <li className="nav-link">
        <Link to="/">Home</Link>
      </li>
      <li className="nav-link">
        <Link to="/calculator">Calculator</Link>
      </li>
      <li className="nav-link">
        <Link to="/clock">Clock</Link>
      </li>
      <li className="nav-link">
        <Link to="/painter">Painter</Link>
      </li>
      <li className="nav-link">
        <Link to="/todolist">Todolist</Link>
      </li>
    </ul>
    <p className="nav-text">Enjoy all utilities with ease !</p>
  </nav>
);

export default Nav;
