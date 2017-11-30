import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router'
import { connect } from 'react-redux';

import Footer from './Footer';
import NavigationBarSign from './NavigationBarSign';

export default class SignupPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      phonenumber: '',
      password: '',
      retypePassword: '',
      error: null
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState ({ [e.target.name]: e.target.value});
  }

  onSubmit(e){
    e.preventDefault();
    this.props.signUpUser(this.state).catch(error => {

      this.setState({
        error: error.data.message
      });
    }).then(() => {
      this.props.router.push('/');
    });

  }

  render() {

    let errorMessage = <small></small>;

    if(this.state.error) {
      
      errorMessage = <small className="text-danger">{this.state.error}</small>;
      
    }

    return (
      <div>
        <div>
        <NavigationBarSign />
        <div className="mt-5">
        <div className="container">
          <div className="row">
            <section className="form-elegant col-md-6 offset-3 mt-5">
              <div className="card">
                <div className="card-body mx-4">
                  <form onSubmit={this.onSubmit}>
                    <div className="text-center">
                        <h3 className="dark-grey-text mb-5"><strong>Sign Up</strong></h3>
                        <br/>
                        {errorMessage} 
                        <br/>
                        
                    </div>
                    <div className="md-form">
                        <input type="text" id="Form-username" onChange={this.onChange} className="form-control" value= {this.state.username}  name="username"></input>
                        <label htmlFor="Form-username">Your username</label>
                    </div>
                    <div className="md-form">
                        <input type="email" id="Form-email" onChange={this.onChange} className="form-control" value= {this.state.email} name="email"></input>
                        <label htmlFor="Form-username">Your email</label>
                    </div>
                    <div className="md-form">
                        <input type="text" id="Form-phonenumber" onChange={this.onChange} className="form-control" value= {this.state.phonenumber} name="phonenumber"></input>
                        <label htmlFor="Form-username">Your Phone Number</label>
                    </div>
                    <div className="md-form">
                        <input type="password" id="Form-username" onChange={this.onChange} className="form-control"  name="password"></input>
                        <label htmlFor="Form-username">Your password</label>
                    </div>
                    <div className="md-form">
                        <input type="password" id="Form-username" onChange={this.onChange} className="form-control" value= {this.state.retypePassword} name="retypePassword"></input>
                        <label htmlFor="Form-username">Retype your password</label>
                    </div>
                    <div className="text-center mb-3">
                        <button type="submit" className="btn btn-blue text-white btn-block btn-rounded z-depth-1a">Sign up</button>
                    </div>
                    <p className="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2"> or Sign up with:</p>
          
                    <div className="row my-3 d-flex justify-content-center">
                        
                        <button type="button" className="btn btn-indigo text-white btn-rounded mr-md-3 z-depth-1a"><i className="fa fa-facebook white-text text-center"></i></button>
                        
                        <button type="button" className="btn btn-blue text-white btn-rounded mr-md-3 z-depth-1a"><i className="fa fa-twitter white-text"></i></button>
                        
                        <button type="button" className="btn btn-red text-white btn-rounded z-depth-1a"><i className="fa fa-google-plus white-text"></i></button>
                    </div>
                  </form>
                </div>
        
                
                <div className="modal-footer mx-5 pt-3 mb-1">
                    <p className="font-small grey-text d-flex justify-content-end">Not a member? <Link to="/signin" className="blue-text ml-1">SIGN IN</Link></p>
                </div>
                  
              </div>
            </section>
          </div>
        </div>

        </div>
        <Footer />
      </div>
      </div>
    );
  }
}
