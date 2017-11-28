import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
          <Link to="/signup">Sign up</Link>
          </div>

          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
            <a href="#">Signup</a>
            </ul>
          </div>
        </div>
      </nav>
)