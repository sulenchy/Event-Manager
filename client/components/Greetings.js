import React from 'react';
import { Link } from 'react-router-dom'

class Greetings extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <h1>Hello, welcome to Andevents</h1>
        <Link to="/signup">signup</Link>
      </div>
    );
  }
}

export default Greetings;