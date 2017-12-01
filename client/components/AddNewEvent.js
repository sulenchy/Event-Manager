import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Calendar } from 'react-calendar-component';
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
      centerId: 0,
      centers: [],
      lgas: ['Agege', 'Amuwo', 'Bariga', 'Ikorodu'],
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
    let data = this.state;
    data.userId = this.props.authUser.user.id;
    this.props.addNewEvent(data)
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
    if(!userString || userData.user.userType === 'admin') {
        this.props.router.push('/');
    }

    axios.get('/api/v1/centers').then((data) => {
        console.log(data);
        this.setState({
            centers: data.data.data
        });
    }).catch((error) => {
       
    });
}

  render() { 
    let errorMessage = <small></small>;
    if(this.state.error) {
      errorMessage = <small className="text-danger">{this.state.error}</small>;
    }

    let centers;

    centers = this.state.centers.map((center,i) => {
        return (
            
         <option value={center.id} key={i}>{center.name}</option>
        );
    });

    let lgas;

    lgas = this.state.lgas.map((lga, i) => {
        return (
            
         <option value={lga} key={i}>{lga}</option>
        );
     });

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
                        <label htmlFor="Form-username">Enter Event title</label>
                    </div>
                    <div className="md-form">
                        <input type="text" id="Form-description" onChange={this.onChange} className="form-control" value= {this.state.description} name="description"></input>
                        <label htmlFor="Form-description">Enter Event description</label>
                    </div>
                    <div className="md-form">
                        <input type="text" id="Form-event-type" onChange={this.onChange} className="form-control" value= {this.state.event_type} name="event_type"></input>
                        <label htmlFor="Form-event-type">Enter Event type</label>
                    </div>
                    <div className="md-form">
                        <input type="text" id="Form-estimated-attendees" onChange={this.onChange} className="form-control" value= {this.state.estimated_attendees} name="estimated_attendees"></input>
                        <label htmlFor="Form-estimated-attendees">Enter estimated attendees</label>
                    </div>
                    <div className="md-form">
                        <input type="text" id="Form-event-date" onChange={this.onChange} className="form-control" value= {this.state.event_date} name="event_date"></input>
                        <label htmlFor="Form-event-date">Enter Event date (yyyy-mm-dd)</label>
                    </div>
                    <div className="md-form">
                    <select className="mdb-select form-control" name="lga" onChange={this.onChange} defaultValue="" value={this.state.lga}>
                            <option value="" disabled>Select LGA</option>
                            {lgas}
                        </select>
                    </div>
                    <div className="md-form">
                        <select className="mdb-select form-control" name="centerId" onChange={this.onChange} defaultValue="" value={this.state.centerId}>
                            <option value="" disabled>Select Center</option>
                            {centers}
                        </select>
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
