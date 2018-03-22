import { connect } from "react-redux";
import MainGobble from "./main_gobble";
import { fetchAllUsers } from "../../actions/user/user_actions";

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchAllUsers: () => dispatch(fetchAllUsers())
  };
};

export default connect(null, mapDispatchToProps)(MainGobble);
