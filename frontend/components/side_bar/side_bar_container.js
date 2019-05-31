import React from 'react';
import { connect } from 'react-redux';
import SideBar from './nav_bar';

export const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.id]
})

export default connect(mapStateToProps, null)(SideBar);