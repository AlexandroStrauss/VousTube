import { connect } from "react-redux";
import SignupForm from "./signup_form";

const mapStateToProps = state => ({
    errors: Object.values(state.errors),
    formType: 'signup'
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    processForm: (user) => dispatch(signup(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm)
