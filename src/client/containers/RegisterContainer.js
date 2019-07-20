import { connect } from 'react-redux';
// actions
import { fetchRegister, fetchRegisterCancelled } from '../../shared/actions/authActions';
// Component
import Register from '../components/Register';


const mapStateToProps = ({ auth }) => ({
  auth,
});

const mapDispatchToProps = {
  fetchRegister,
  fetchRegisterCancelled,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
