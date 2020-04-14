import { connect } from 'react-redux';
import { signup, clearErrors } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = (state) => ({
    signedIn: state.session.isSignedIn,
    errors: state.errors.session,
    formType: "signup"
});

const mapDispatchToProps = (dispatch) => ({
    processForm: user => dispatch(signup(user)),
    clearErrors: () => dispatch(clearErrors())
})

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);