import { connect } from "react-redux";
import LoginForm from "./login_form";
import { login, check } from "../../actions/session_actions";


const mapStateToProps = state => ({
    errors: Object.values(state.errors),
    formType: 'login'
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    processForm: user => dispatch(login(user)),
    check: identifier => dispatch(check(identifier))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
