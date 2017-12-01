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
        <main className="container">
           
            <section className="section pb-3 text-center text-lg-center center-box">
           
            <h2 className="section-heading h1 pt-4 text-center">List of centers</h2>
           
            <p className="section-description">View our centers across Nigeria.</p>
           
            <div className="row">
            
                <div className="col-lg-4 mb-4">
            
                <div className="view overlay hm-white-slight z-depth-1-half">
                    <img src="https://mdbootstrap.com/img/Photos/Others/img (38).jpg" className="img-fluid" alt="First sample image" />
                    <a>
                    <div className="mask" />
                    </a>
                </div>
                </div>
            
                <div className="col-lg-7 ml-xl-4 mb-4">
                
                <h4 className="mb-3"><strong>Temilaj Center</strong></h4>
                <p>Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus et aut officiis debitis aut rerum.</p>
                <p>added by <a><strong>admin</strong></a>, on 17/11/2017</p>
                <a className="btn btn-primary btn-sm">Read more</a>
                </div>
                
            </div>
            
            <hr className="mb-5" />
            
            <div className="row mt-3">
                
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
                <a className="btn btn-primary btn-sm">Read more</a>
                </div>
                
            </div>
            
            <hr className="mb-5" />
            
            <div className="row">
                
                <div className="col-lg-4 mb-4">
                
                <div className="view overlay hm-white-slight z-depth-1-half">
                    <img src="https://mdbootstrap.com/img/Photos/Others/img (35).jpg" className="img-fluid" alt="Third sample image" />
                    <a>
                    <div className="mask" />
                    </a>
                </div>
                </div>
                
                <div className="col-lg-7 ml-xl-4 mb-4">
                
                <h4 className="mb-3"><strong>Morning Light center</strong></h4>
                <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur.</p>
                <p>added by <a><strong>admin</strong></a>, on 17/11/2017</p>
                <a className="btn btn-primary btn-sm">Read more</a>
                </div>
                
            </div>
            
            </section>
        </main>
        );
    }
    });
        <Footer />
      </div>
      </div>
    );
  }
}
