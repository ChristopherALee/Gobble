import { connect } from "react-redux";
import Loading from "./loading";

const mapStateToProps = (state, ownProps) => {
	return {
		loading: state.ui.loading
	};
};

export default connect(mapStateToProps, null)(Loading);
