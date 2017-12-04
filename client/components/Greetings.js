import React from 'react';
import NavigationBar from './NavigationBar';
import Footer from './Footer';

class Greetings extends React.Component {
  render() {


    let homeButton = <a className="btn btn-primary btn-lg" role="button"
    onClick={() => {
        this.props.signInUser();
    }}
    >Read more</a>;
    if(this.props.users.length > 0) {
        homeButton = <a className="btn btn-primary btn-lg" role="button"
        >Read more</a>
    }

    let authUser = this.props.authUser;
    let authUserName;
    if(authUser) {
        authUserName = authUser.user.username;
    }

    return (
      <div>
        <NavigationBar {...this.props} />
        <div className="#">
          <main className="container">
            <div className="jumbotron mt-5" id="about">
              <h1 className="h1-responsive">Hello {authUserName}, welcome to Andevents</h1>
              <p className="lead">Andevents is the best event manager you can find anywhere across Nigeria. We have locations all over the country. We offer the best price you can think of. We manage everything about your event…</p>
              <hr className="my-2"></hr>
              <p>With us all events are boom ! !! !!!!.</p>
              {homeButton}
            </div>
            <div className="carousel slide carousel-fade text-center" id="trending-centers" data-ride="carousel">
              <h1 className="section-heading h1 pt-4 light-blue-text">Trending Centers</h1>
              <p className="section-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, error amet numquam iure provident voluptate esse quasi, veritatis totam voluptas nostrum quisquam eum porro a pariatur accusamus veniam.</p>
              <ol className="carousel-indicators">
                  <li data-target="#carousel-example-2" data-slide-to="0" className="active"></li>
                  <li data-target="#carousel-example-2" data-slide-to="1"></li>
                  <li data-target="#carousel-example-2" data-slide-to="2"></li>
              </ol>
              <div className="carousel-inner" role="listbox">
                  <div className="carousel-item active">
                    <div className="view hm-black-light">
                        <img className="d-block w-100" src="https://mdbootstrap.com/img/Photos/Slides/img%20(68).jpg" alt="First slide"></img>
                        <div className="mask"></div>
                    </div>
                    <div className="carousel-caption">
                        <h3 className="h3-responsive">Light mask</h3>
                        <p>First text</p>
                    </div>
                  </div>
                  <div className="carousel-item">
                      <div className="view hm-black-strong">
                          <img className="d-block w-100" src="https://mdbootstrap.com/img/Photos/Slides/img%20(6).jpg" alt="Second slide"></img>
                          <div className="mask"></div>
                      </div>
                      <div className="carousel-caption">
                          <h3 className="h3-responsive">Strong mask</h3>
                          <p>Secondary text</p>
                      </div>
                  </div>
                  <div className="carousel-item">
                      <div className="view hm-black-slight">
                          <img className="d-block w-100" src="https://mdbootstrap.com/img/Photos/Slides/img%20(9).jpg" alt="Third slide"></img>
                          <div className="mask"></div>
                      </div>
                      <div className="carousel-caption">
                          <h3 className="h3-responsive">Slight mask</h3>
                          <p>Third text</p>
                      </div>
                  </div>
              </div>
              <a className="carousel-control-prev" href="#carousel-example-2" role="button" data-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#carousel-example-2" role="button" data-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="sr-only">Next</span>
              </a>
            </div>

            <div id="recent-events" className="carousel slide carousel-fade text-center" data-ride="carousel">
                      <h1 className="section-heading h1 pt-4 light-blue-text">Most Recent Events</h1>
                      <p className="section-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, error amet numquam iure provident voluptate esse quasi, veritatis totam voluptas nostrum quisquam eum porro a pariatur accusamus veniam.</p>
              <ol className="carousel-indicators">
                  <li data-target="#video-carousel-example" data-slide-to="0" className="active"></li>
                  <li data-target="#video-carousel-example" data-slide-to="1"></li>
                  <li data-target="#video-carousel-example" data-slide-to="2"></li>
              </ol>
              
              <div className="carousel-inner" role="listbox">
                  <div className="carousel-item active">
                      <video className="video-fluid" autoPlay loop>
                          <source src="https://mdbootstrap.com/img/video/Tropical.mp4" type="video/mp4" />
                      </video>
                  </div>
                  <div className="carousel-item">
                      <video className="video-fluid" autoPlay loop>
                          <source src="https://mdbootstrap.com/img/video/forest.mp4" type="video/mp4" />
                      </video>
                  </div>
                  <div className="carousel-item">
                      <video className="video-fluid" autoPlay loop>
                          <source src="https://mdbootstrap.com/img/video/Agua-natural.mp4" type="video/mp4" />
                      </video>
                  </div>
              </div>
              
              <a className="carousel-control-prev" href="#video-carousel-example" role="button" data-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#video-carousel-example" role="button" data-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="sr-only">Next</span>
              </a>
              
          </div>


            <section className="section pb-3 text-center">
              <div id="testimonials">
                    <h1 className="section-heading h1 pt-4 light-blue-text">Testimonials</h1>
                    <p className="section-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, error amet numquam iure provident voluptate esse quasi, veritatis totam voluptas nostrum quisquam eum porro a pariatur accusamus veniam.</p>
              </div>
              <div className="row">
                <div className="col-lg-4 col-md-12 mb-r">
                    <div className="card testimonial-card">
                        <div className="card-up blue lighten-2">
                        </div>
                        <div className="avatar"><img src="https://mdbootstrap.com/img/Photos/Avatars/img%20(20).jpg" className="rounded-circle img-responsive"></img>
                        </div>
        
                        <div className="card-body">
                            <h4 className="card-title mt-1">Anna Aston</h4>
                            <hr></hr>
                            <p><i className="fa fa-quote-left"></i> Neque cupiditate assumenda in maiores repudiandae mollitia architecto.</p>
                        </div>
        
                    </div>
                </div>
                <div className="col-lg-4 col-md-12 mb-r">
                    <div className="card testimonial-card">
                        <div className="card-up blue lighten-2">
                        </div>
                        <div className="avatar"><img src="https://mdbootstrap.com/img/Photos/Avatars/img%20(20).jpg" className="rounded-circle img-responsive"></img>
                        </div>
        
                        <div className="card-body">
                            <h4 className="card-title mt-1">Anna Aston</h4>
                            <hr></hr>
                            <p><i className="fa fa-quote-left"></i> Neque cupiditate assumenda in maiores repudiandae mollitia architecto.</p>
                        </div>
        
                    </div>
                </div>
                <div className="col-lg-4 col-md-12 mb-r">
                    <div className="card testimonial-card">
                        <div className="card-up deep-purple lighten-2"></div>
                        <div className="avatar"><img src="https://mdbootstrap.com/img/Photos/Avatars/img%20(10).jpg" className="rounded-circle img-responsive"></img>
                        </div>
        
                        <div className="card-body">
                            <h4 className="card-title mt-1">Maria Kate</h4>
                            <hr></hr>
                            <p><i className="fa fa-quote-left"></i> Delectus impedit saepe officiis ab aliquam repellat, rem totam unde ducimus.</p>
                        </div>
                    </div>
                </div>
              </div>
            </section>

          </main>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Greetings;