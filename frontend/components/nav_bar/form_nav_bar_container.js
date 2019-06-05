import React from 'react';
import { connect } from 'react-redux';
import FormNavBar from './form_nav_bar';

export const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.id]
})

export default connect(mapStateToProps, null)(FormNavBar)