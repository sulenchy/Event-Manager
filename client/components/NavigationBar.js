import React from 'react';
import { Link } from 'react-router';

export default class NavigationBar extends React.Component {
    render() {
        let navButtons = (
            <span>
                <Link className="btn btn-blue text-white" to="/signin">Sign-in</Link>
                <Link className="btn btn-blue text-white" to="/signup">Sign-up</Link>
            </span>
        );

        if (this.props.authUser) {
            navButtons = <button className="btn btn-blue text-white"
            onClick={() => {
                this.props.signOut();
                this.props.router.push('/')
            }}
            >Sign-out</button>
        }

        let navLinks = (<ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                </li>
                
            </ul>);
        let pathName = this.props.location.pathname;

        if (pathName === '/') {
            navLinks =  <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                    <a className="nav-link" href="#about">About us</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#trending-centers">Trending Centers</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#recent-events">Recent Events</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#testimonials">Testimonials</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Help</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Contacts</a>
                                </li>
                            
                        </ul>
        }
        
        return (
            <header className="navbar navbar-default">
            <nav className="navbar navbar-expand-lg navbar-dark indigo fixed-top">
                <a className="navbar-brand" href="#">Andevents</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {navLinks}
                    <form className="form-inline">
                        {navButtons}
                    </form>
                </div>
            
            </nav>
        
          </header>
        );
    }
}