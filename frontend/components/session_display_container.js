import React from 'react';
import { logout } from "../actions/session_actions";
import SessionDisplay from "./session_display";
import { connect } from 'react-redux';

export const mapStateToProps = state => {
    debugger
    return {
        currentUser: state.entities.users[state.session.id]
    }
}

export const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(SessionDisplay);