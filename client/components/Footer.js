import React from 'react';
import { Link } from 'react-router';

export default () => (
    <footer className="page-footer indigo center-on-small-only pt-0">
        <div className="container">
            <div className="row pt-5 mb-3 text-center d-flex justify-content-center">
                
                <hr className="clearfix d-md-none rgba-white-light"></hr>
                <div className="row d-flex text-center justify-content-center mb-md-0 mb-4">
                    <div className="col-md-8 col-12 mt-5">
                        <p>Andevents is the best event manager you can find anywhere across Nigeria. We have locations all over the country. We offer the best price you can think of. We manage everything about your event…</p>
        
                    </div>
                </div>
                <hr className="clearfix d-md-none rgba-white-light"></hr>
                <div className="row pb-3">
                    <div className="col-md-12">
                        <div className="footer-socials mb-5 flex-center">
                            <a className="icons-sm fb-ic"><i className="fa fa-facebook fa-lg white-text mr-md-4"> </i></a>
                            <a className="icons-sm tw-ic"><i className="fa fa-twitter fa-lg white-text mr-md-4"> </i></a>
                            <a className="icons-sm gplus-ic"><i className="fa fa-google-plus fa-lg white-text mr-md-4"> </i></a>
                            <a className="icons-sm li-ic"><i className="fa fa-linkedin fa-lg white-text mr-md-4"> </i></a>
                            <a className="icons-sm ins-ic"><i className="fa fa-instagram fa-lg white-text mr-md-4"> </i></a>
                            <a className="icons-sm pin-ic"><i className="fa fa-pinterest fa-lg white-text"> </i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="footer-copyright">
            <div className="container-fluid">
                © 2017 Copyright: <a href="https://www.MDBootstrap.com"> AndelaNg.com </a>
            </div>
        </div>
    </footer>
)