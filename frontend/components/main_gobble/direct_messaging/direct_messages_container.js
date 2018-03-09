import { connect } from "react-redux";
import DirectMessages from "./direct_messages";
import {
  fetchSingleDirectMessage,
  createDirectMessage,
  deleteDirectMessage
} from "../../../actions/direct_messaging/direct_message_actions";
import {
  fetchDirectMessageChannelMessages,
  fetchSingleDirectMessageChannel
} from "../../../actions/direct_messaging/direct_message_channel_actions";
import { fetchCurrentUser } from "../../../actions/session/session_actions";

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchSingleDirectMessage: id => dispatch(fetchSingleDirectMessage(id)),
    createDirectMessage: message => dispatch(createDirectMessage(message)),
    deleteDirectMessage: id => dispatch(deleteDirectMessage(id)),
    fetchDirectMessageChannelMessages: id =>
      dispatch(fetchDirectMessageChannelMessages(id)),
    fetchSingleDirectMessageChannel: channel =>
      dispatch(fetchSingleDirectMessageChannel(channel)),
    fetchCurrentUser: userId => dispatch(fetchCurrentUser(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DirectMessages);
