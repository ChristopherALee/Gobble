import React from "react";
import { Link } from "react-router-dom";

const DirectMessageList = props => {
  let directMessages;

  if (props.directMessagingChannels.length) {
    directMessages = props.directMessagingChannels.sort((a, b) => {
      let channelName1 = a.name;
      let channelName2 = b.name;

      if (channelName1 < channelName2) {
        return -1;
      } else if (channelName1 > channelName2) {
        return 1;
      } else {
        return 0;
      }
    });

    directMessages = directMessages.map((channel, idx) => {
      let recipients = channel.members
        .filter(member => member !== channel.creatorName)
        .join("");

      if (channel.id === parseInt(props.pathname.slice(15))) {
        return (
          <Link
            to={`/messages/dm/${channel.id}`}
            className="active-channel"
            key={idx}
          >
            <li>
              <div>{recipients}</div>
            </li>
          </Link>
        );
      } else {
        return (
          <Link to={`/messages/dm/${channel.id}`} key={idx}>
            <li>
              <div>{recipients}</div>
            </li>
          </Link>
        );
      }
    });
  }

  return <ul className="dms-list">{directMessages}</ul>;
};

export default DirectMessageList;
