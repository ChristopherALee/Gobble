import React from "react";
import { Link } from "react-router-dom";

const DirectMessageList = props => {
  let directMessages;

  const regSort = arr => {
    return arr.sort((a, b) => {
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    });
  };

  if (props.directMessagingChannels.length) {
    directMessages = props.directMessagingChannels.sort((a, b) => {
      let sortedMembersA = regSort(a.members);
      let sortedMembersB = regSort(b.members);

      let channelName1 = a.name;
      let channelName2 = b.name;

      if (sortedMembersA[0] < sortedMembersB[0]) {
        return -1;
      } else if (sortedMembersA[0] > sortedMembersB[0]) {
        return 1;
      } else {
        return 0;
      }
    });

    directMessages = directMessages.map((channel, idx) => {
      let recipients = channel.members.filter(
        member => member !== props.currentUser
      );

      let recipientCount = recipients.length;

      if (recipientCount === 1) {
        recipients = recipients.join("");
      } else {
        recipients = recipients.join(", ");
      }

      if (channel.id === parseInt(props.pathname.slice(13))) {
        if (recipientCount === 1) {
          return (
            <Link
              to={`/messages/dm/${channel.id}`}
              className="active-channel"
              key={idx}
            >
              <li>
                <div className="hovered-active-circle" />
                <div className="recipients">{recipients}</div>
              </li>
            </Link>
          );
        } else {
          return (
            <Link
              to={`/messages/dm/${channel.id}`}
              className="active-channel"
              key={idx}
            >
              <li>
                <div className="dm-member-count">
                  <p>{recipientCount}</p>
                </div>
                <div className="recipients">{recipients}</div>
              </li>
            </Link>
          );
        }
      } else {
        if (recipientCount === 1) {
          return (
            <Link to={`/messages/dm/${channel.id}`} key={idx}>
              <li>
                <div className="active-circle" />
                <div className="recipients">{recipients}</div>
              </li>
            </Link>
          );
        } else {
          return (
            <Link to={`/messages/dm/${channel.id}`} key={idx}>
              <li>
                <div className="dm-member-count">
                  <p>{recipientCount}</p>
                </div>
                <div className="recipients">{recipients}</div>
              </li>
            </Link>
          );
        }
      }
    });
  }

  return <ul className="dms-list">{directMessages}</ul>;
};

export default DirectMessageList;
