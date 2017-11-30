import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from './actions/actionCreators'

class App extends React.Component {
    render() {
        return (
            <div>
                {React.cloneElement(this.props.children, this.props)}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const Main = connect(mapStateToProps, mapDispatchToProps)(App);

export default Main;
