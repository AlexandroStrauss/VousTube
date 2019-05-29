import { connect } from "react-redux";
import LoginForm from "./login_form";


const mapStateToProps = state => ({
    errors: Object.values(state.errors),
    formType: 'login'
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    processForm: user => dispatch(login(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
