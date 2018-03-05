import React from "react";
import { Link } from "react-router-dom";

const ChannelList = props => {
  let channels;

  if (props.channels.length) {
    channels = props.channels.sort((a, b) => {
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

    channels = props.channels.map((channel, idx) => {
      if (channel.name === props.pathname.slice(10)) {
        return (
          <Link
            to={`/messages/${channel.name}`}
            className="active-channel"
            key={idx}
          >
            <li key={idx}>
              <div>#</div>
              {channel.name}
            </li>
          </Link>
        );
      } else {
        return (
          <Link to={`/messages/${channel.name}`} key={idx}>
            <li>
              <div>#</div>
              {channel.name}
            </li>
          </Link>
        );
      }
    });
  }

  return <ul className="channel-list">{channels}</ul>;
};

export default ChannelList;
