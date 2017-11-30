import React from 'react';

export default class SigninPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error: null
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
        if(this.props.authUser) {
            this.props.router.push('/');
        } 
    }

    onChange(e){
        this.setState ({ [e.target.name]: e.target.value});
    }
    
    onSubmit(e){
        e.preventDefault();
        this.props.signInUser({ email: this.state.email, password: this.state.password }).then((data) => {
            console.log(data);
            this.props.router.push('/');
        }).catch(error => {
            console.log(error);
            this.setState({ error: error.data.message });
        });
    }

    render() {
        let errorMessage;

        if (this.state.error) {
            errorMessage = <small className="text-danger">{this.state.error}</small>
        }
        return (
            <main className="container">
            <div className="row">
              <section className="form-elegant col-md-6 center-box">
                {/*Form without header*/}
                <div className="card">
                  <div className="card-body mx-4">
                    {/*Header*/}
                    <div className="text-center">
                      <h3 className="dark-grey-text mb-5"><strong>Sign in</strong></h3>
                      {errorMessage}
                      <br/>
                    </div>
                    {/*Body*/}
                    <div className="md-form">
                      <input type="text" id="Form-email1" value={this.state.email} name="email" onChange={this.onChange} className="form-control" />
                      <label htmlFor="Form-email1">Your email</label>
                    </div>
                    <div className="md-form pb-3">
                      <input type="password" id="Form-pass1" className="form-control" name="password" value={this.state.password} onChange={this.onChange}/>
                      <label htmlFor="Form-pass1">Your password</label>
                      <p className="font-small blue-text d-flex justify-content-end">Forgot <a href="#" className="blue-text ml-1"> Password?</a></p>
                    </div>
                    <div className="text-center mb-3">
                      <a className="btn btn-blue text-white btn-block btn-rounded z-depth-1a" onClick={this.onSubmit}>Sign in</a>
                    </div>
                    <p className="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2"> or Sign in with:</p>
                    <div className="row my-3 d-flex justify-content-center">
                      {/*Facebook*/}
                      <button type="button" className="btn btn-indigo text-white btn-rounded mr-md-3 z-depth-1a"><i className="fa fa-facebook white-text text-center" /></button>
                      {/*Twitter*/}
                      <button type="button" className="btn btn-blue text-white btn-rounded mr-md-3 z-depth-1a"><i className="fa fa-twitter white-text" /></button>
                      {/*Google +*/}
                      <button type="button" className="btn btn-red text-white btn-rounded z-depth-1a"><i className="fa fa-google-plus white-text" /></button>
                    </div>
                  </div>
                  {/*Footer*/}
                  <div className="modal-footer mx-5 pt-3 mb-1">
                    <p className="font-small grey-text d-flex justify-content-end">Not a member? <a href="signup.html" className="blue-text ml-1"> Sign Up</a></p>
                  </div>
                </div>
                {/*/Form without header*/}
              </section>
            </div>
          </main>          
        );
    }
}