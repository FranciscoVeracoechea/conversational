import { connect } from 'react-redux';
// actions
import { fetchLogin } from '../../../shared/actions/authActions';
// Component
import Register from './LoginForm';


const mapStateToProps = ({ auth }) => ({
  auth,
});

const mapDispatchToProps = {
  fetchLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
