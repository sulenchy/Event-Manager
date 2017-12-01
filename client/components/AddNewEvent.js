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
      title: '',
      description: '',
      event_type: '',
      estimated_attendees: '',
      event_date: '',
      lga: '',
      centerId: '',
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
                        <h3 className="dark-grey-text mb-5"><strong>Add New Event</strong></h3>
                        <br/>
                        {errorMessage} 
                        <br/>
                    </div>
                    <div className="md-form">
                        <input type="text" id="Form-title" onChange={this.onChange} className="form-control" value= {this.state.title}  name="title"></input>
                        <label htmlFor="Form-username">EnterEvent title</label>
                    </div>
                    <div className="md-form">
                        <input type="text" id="Form-decription" onChange={this.onChange} className="form-control" value= {this.state.decription} name="decription"></input>
                        <label htmlFor="Form-address">Enter Event decription</label>
                    </div>
                    <div className="md-form">
                        <input type="text" id="Form-event-type" onChange={this.onChange} className="form-control" value= {this.state.event_type} name="event-type"></input>
                        <label htmlFor="Form-cost">Enter Event type</label>
                    </div>
                    <div className="md-form">
                        <input type="text" id="Form-estimated-attendees" onChange={this.onChange} className="form-control" value= {this.state.estimated_attendees} name="estimated-attendees"></input>
                        <label htmlFor="Form-facilities">Enter estimated attendees</label>
                    </div>
                    <div className="md-form">
                        <input type="text" id="Form-event-date" onChange={this.onChange} className="form-control" value= {this.state.event_date} name="event-date"></input>
                        <label htmlFor="Form-image">Enter Event date (yy-mm-dd)</label>
                    </div>
                    <div className="md-form">
                        <div className="btn-group">
                            <button type="button" className="btn btn-gray col-md-9">select Event LGA</button>
                            <button type="button" className="btn btn-indigo-skin col-md-3 dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="sr-only">Toggle Dropdown</span>
                            </button>
                            <div className="dropdown-menu">
                            <a className="dropdown-item" href="#">Agege</a>
                            <a className="dropdown-item" href="#">Amowo</a>
                            <a className="dropdown-item" href="#">Festac</a>
                            <a className="dropdown-item" href="#">Ikorodu</a>
                            <a className="dropdown-item" href="#">Surulere</a>
                            </div>
                        </div>
                    </div>
                    <div className="md-form">
                        <div className="btn-group">
                            <button type="button" className="btn btn-gray col-md-9">select Center</button>
                            <button type="button" className="btn btn-indigo-skin col-md-3 dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="sr-only">Toggle Dropdown</span>
                            </button>
                            <div className="dropdown-menu">
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <a className="dropdown-item" href="#">Something else here</a>
                            <div className="dropdown-divider" />
                            <a className="dropdown-item" href="#">Separated link</a>
                            </div>
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
