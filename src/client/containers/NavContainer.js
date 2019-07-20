import { connect } from 'react-redux';
import { goBack, push } from 'connected-react-router';
// actions
import * as actions from '../../shared/actions/authActions';
// Component
import MainNav from '../components/Nav/Main';


const mapStateToProps = ({ auth }) => ({
  auth,
});

const mapDispatchToProps = {
  ...actions,
  goBack,
  push,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainNav);
