import * as APIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const signup = signupUser => dispatch => APIUtil.signup(signupUser)
    .then(user => dispatch(receiveCurrentUser(user)));

export const logout = () => dispatch => APIUtil.logout()
    .then(() => dispatch(logoutCurrentUser()));

export const login = loginUser => dispatch => APIUtil.login(loginUser)
    .then(user => dispatch(receiveCurrentUser(user)));

export const check = identifier => dispatch => APIUtil.check(identifier)

const receiveCurrentUser = currentUser => {
    return {
    type: RECEIVE_CURRENT_USER,
    user: currentUser
}
}

const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER
});

const receiveErrors = errors => ({
    type: RECEIVE_ERRORS,
    errors
});
