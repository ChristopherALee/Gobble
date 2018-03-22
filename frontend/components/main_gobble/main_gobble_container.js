import { connect } from "react-redux";
import MainGobble from "./main_gobble";
import { fetchAllUsers } from "../../actions/user/user_actions";

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.ui.loading
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchAllUsers: () => dispatch(fetchAllUsers())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainGobble);
