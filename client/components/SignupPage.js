import React from 'react';

class SignupPage extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      username: '',
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState ({[e.target.name]: e.target.value});
  }

  onSubmit(e){
    e.preventDefault();
    console.log(this.state);
  }
  render() {
    return (    
      <div>
        <main className="container">
          <div className="row">
          <section className="form-elegant col-md-6 center-box">
            <div className="card">
              <div className="card-body mx-4">
                <div className="text-center">
                    <h3 className="dark-grey-text mb-5"><strong>Sign Up</strong></h3>
                </div>
                <div className="md-form">
                    <input type="text" id="Form-username" className="form-control"  name="username"></input>
                    <label htmlFor="Form-email1">Your username</label>
                </div>
                
                
                <div className="text-center mb-3">
                    <button type="button" className="btn btn-blue text-white btn-block btn-rounded z-depth-1a">Sign up</button>
                </div>
                            <p className="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2"> or Sign up with:</p>
                
                                <div className="row my-3 d-flex justify-content-center">
                                   
                                    <button type="button" className="btn btn-indigo text-white btn-rounded mr-md-3 z-depth-1a"><i className="fa fa-facebook white-text text-center"></i></button>
                                    
                                    <button type="button" className="btn btn-blue text-white btn-rounded mr-md-3 z-depth-1a"><i className="fa fa-twitter white-text"></i></button>
                                    
                                    <button type="button" className="btn btn-red text-white btn-rounded z-depth-1a"><i className="fa fa-google-plus white-text"></i></button>
                                </div>
                
                        </div>
                
                        
                        <div className="modal-footer mx-5 pt-3 mb-1">
                            <p className="font-small grey-text d-flex justify-content-end">Not a member? <a href="signin.html" className="blue-text ml-1"> SIGN IN</a></p>
                        </div>
                
            </div>
          </section>
          </div>
        </main>
      </div>
    );
  }
}

export default SignupPage;