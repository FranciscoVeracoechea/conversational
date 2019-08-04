// dependencies
import { connect } from 'react-redux';
// component
import Profile from './Profile';
// actions
import { saveProfile } from '../../../shared/actions/profileActions';


const mapStateToProps = ({ auth, profile }) => ({
  auth,
  profile,
});

const mapDispatchToProps = {
  saveProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
