import React from 'react';
import { NavLink } from 'react-router-dom';
import { navs } from '../data/navData';

const Nav = () => (
  <nav>
    <h1 className="nav-logo">wediz</h1>
    <ul>
      {navs.map((navItem) => (
        <li className="nav-link" key={navItem.id}>
          <NavLink to={navItem.path} activeClassName="nav-active">
            {navItem.name}
          </NavLink>
        </li>
      ))}
    </ul>
    <p className="nav-text">Enjoy all utilities with ease !</p>
  </nav>
);

export default Nav;
