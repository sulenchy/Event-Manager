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


  render() { 
    let errorMessage = <small></small>;
    if(this.state.error) {
      errorMessage = <small className="text-danger">{this.state.error}</small>;
    }
    return (
      <div>
        <div>
        <NavigationBar {...this.props}/>
        <main className="container mt-5">
           
            <section className="section pb-3 text-center text-lg-center center-box">
           
            <h2 className="section-heading h1 pt-4 text-center">List of centers</h2>
           
            <p className="section-description">View our centers across Nigeria.</p>
           
            <hr className="mb-5" />
            
            <card className="row mt-3">
            <div className="col-lg-4 mb-4">
                
                <div className="view overlay hm-white-slight z-depth-1-half">
                    <img src="https://mdbootstrap.com/img/Photos/Others/forest-sm.jpg" className="img-fluid" alt="Second sample image" />
                    <a>
                    <div className="mask" />
                    </a>
                </div>
                </div>
                
                <div className="col-lg-7 ml-xl-4 mb-4">
                
                <h4 className="mb-3"><strong>Philips All-in-one events</strong></h4>
                <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident et dolorum fuga.</p>
                <p>added by <a><strong>admin</strong></a>, on 17/11/2017</p>
                <button type="submit" className="btn btn-primary btn-sm">Read More</button><button type="submit" className="btn btn-primary btn-sm">Delete</button><button type="submit" className="btn btn-primary btn-sm">Edit</button>
                </div>
            </card>
            
            </section>
        </main>
        <Footer />
      </div>
      </div>
    );
  }
}
