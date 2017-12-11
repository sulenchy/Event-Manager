import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router'
import { connect } from 'react-redux';

import Footer from './Footer';
import NavigationBar from './NavigationBar';

export default class AddNewCenter extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      address: '',
      capacity: '',
      cost: '',
      facilities: '',
      image: '',
      available: true,
      userId: 4,
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
    this.props.addNewCenter(this.state)
      .then(() => {
        this.props.router.push('/');
      }).catch(error => {
        this.setState({
          error: error.data.message
        });
    });

  }

  /**
   * componentWillMount runs before render()
   */
  componentWillMount() {
    // get authenticated user data from localstorage
    const userString =localStorage.getItem('authUser');
    const userData = JSON.parse(userString);
    // protecting the routes
    if(!userString || userData.user.userType === 'client') {
        this.props.router.push('/');
    }
}

  render() { 
    let errorMessage = <small></small>;
    if(this.state.error) {
      errorMessage = <small className="text-danger">{this.state.error}</small>;
    }
    return (
      <div>
        <div>
        <NavigationBar {...this.props}/>
        <div className="mt-5">
        <div className="container">
          <div className="row">
            <section className="form-elegant col-md-6 offset-3 mt-5">
              <div className="card">
                <div className="card-body mx-4">
                  <form onSubmit={this.onSubmit}>
                    <div className="text-center">
                        <h3 className="dark-grey-text mb-5"><strong>Add New Center</strong></h3>
                        <br/>
                        {errorMessage} 
                        <br/>
                    </div>
                    <div className="md-form">
                        <input type="text" id="Form-username" onChange={this.onChange} className="form-control" value= {this.state.name}  name="name"></input>
                        <label htmlFor="Form-username">Enter the center name</label>
                    </div>
                    <div className="md-form">
                        <input type="text" id="Form-address" onChange={this.onChange} className="form-control" value= {this.state.address} name="address"></input>
                        <label htmlFor="Form-address">Enter address</label>
                    </div>
                    <div className="md-form">
                        <input type="text" id="Form-capacity" onChange={this.onChange} className="form-control" value= {this.state.capacity} name="capacity"></input>
                        <label htmlFor="Form-capacity">Enter Capacity</label>
                    </div>
                    <div className="md-form">
                        <input type="text" id="Form-cost" onChange={this.onChange} className="form-control" value= {this.state.cost} name="cost"></input>
                        <label htmlFor="Form-cost">Enter cost</label>
                    </div>
                    <div className="md-form">
                        <input type="text" id="Form-facilities" onChange={this.onChange} className="form-control" value= {this.state.facilities} name="facilities"></input>
                        <label htmlFor="Form-facilities">Enter facilities</label>
                    </div>
                    <div className="md-form">
                        <div className="file-path-wrapper">
                          <input className="file-path validate" type="file" onChange={this.onChange} placeholder="Upload center image" value={this.state.image} name="image"></input>
                        </div>
                    </div>
                    <div className="text-center mb-3">
                        <button type="submit" className="btn btn-blue text-white btn-block btn-rounded z-depth-1a">Add</button>
                    </div>
                  </form>
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
