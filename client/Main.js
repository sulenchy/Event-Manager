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

/**
 * this maps states to props for the presentational component
 * @param {state} state - the current Redux store state
 * @return {state} state - props you want to pass to a presentational component 
 */
const mapStateToProps = (state) => {
    return state;
}

/**
 * this maps action (dispatch) to props for the presentational component
 * @param {dispatch} dispatch - the current Redux store state
 * @return {} callback props intended to be injected into the presentational component
 */
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
}
/** This connects the stateProps with dispatchProps to create 
 * the content of the presentational component
 **/
const Main = connect(mapStateToProps, mapDispatchToProps)(App);

export default Main;
