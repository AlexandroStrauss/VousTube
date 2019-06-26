import { connect } from 'react-redux';
import IndividualReplies from './individual_replies';

const mapStateToProps = (state, ownProps) => {
    const comment = state.entities.comments[ownProps.id]
    debugger
    return {
        comment,
        users: state.entities.users,

    }
}

const mapDispatchToProps = dispatch => ({ })

export default connect(mapStateToProps, null)(IndividualReplies);