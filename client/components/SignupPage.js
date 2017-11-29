import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { connect } from 'react-redux';
import { userSignupRequest } from '../actions/signupActions';

import SignupForm from './SignupForm';
import Footer from './Footer';


class SignupPage extends React.Component {
  render() {
    const { userSignupRequest } = this.props;
    return (
      <div>
        <SignupForm userSignupRequest={userSignupRequest}/>
      </div>
    );
  }
}
 

SignupPage.propTypes ={
  userSignupRequest: PropTypes.func.isRequired,
}

export default connect((state) => {return {} }, { userSignupRequest })(SignupPage);