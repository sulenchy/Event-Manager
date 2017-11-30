import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import store from './index';
import * as actionCreators from './actions/actionCreators'

class App extends React.Component {
    componentWillMount() {
         const userString = localStorage.getItem('authUser');

         if(userString) {
             const userData = JSON.parse(userString);
             store.dispatch({
                 type: 'SIGN_IN_USER',
                 payload: userData
             });
         }
    }
    render() {
        return (
            <div>
                {React.cloneElement(this.props.children, this.props)}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
}

// function mapStateToProps(state) {
//     return state;
// }

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
}
// function mapDispatchToProps(dispatch) {
//     return bindActionCreators(actionCreators, dispatch);
// }

const Main = connect(mapStateToProps, mapDispatchToProps)(App);

export default Main;
