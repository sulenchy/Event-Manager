import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <header className="navbar navbar-default">
    <nav className="navbar navbar-expand-lg navbar-dark indigo fixed-top">
        <a className="navbar-brand" href="#">Andevents</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Help</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Contacts</a>
                </li>
            </ul>
            <form className="form-inline">
                <Link className="btn btn-blue text-white" to="/signin">Sign-in</Link>
                <Link className="btn btn-blue text-white" to="/signup">Sign-up</Link>
            </form>
        </div>
    
    </nav>

  </header>

)