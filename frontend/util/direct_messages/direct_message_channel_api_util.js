export const fetchAllDirectMessageChannels = () => {
  return $.ajax({
    method: "GET",
    url: "/api/direct_message_channels"
  });
};

export const fetchSingleDirectMessageChannel = id => {
  return $.ajax({
    method: "GET",
    url: `/api/direct_message_channels/${id}`
  });
};

export const createDirectMessageChannel = channel => {
  return $.ajax({
    method: "POST",
    url: "/api/direct_message_channels",
    data: channel
  });
};

export const updateDirectMessageChannel = channel => {
  return $.ajax({
    method: "PATCH",
    url: `/api/direct_message_channels/${channel.id}`,
    data: channel
  });
};

export const deleteDirectMessageChannel = id => {
  return $.ajax({
    method: "DELETE",
    url: `/api/direct_message_channels/${id}`
  });
};

export const fetchDirectMessageChannelMessages = id => {
  return $.ajax({
    method: "GET",
    url: `/api/direct_message_channels/${id}/messages`
  });
};
