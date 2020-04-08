import { connect } from 'react-redux';
import { signup, clearSessionErrors } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = (state) => ({
    signedIn: state.session.isSignedIn,
    errors: state.errors.session,
    formType: "signup"
});

const mapDispatchToProps = (dispatch) => ({
    processForm: user => dispatch(signup(user)),
    clearSessionErrors: () => dispatch(clearSessionErrors())
})

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);