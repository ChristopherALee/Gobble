export const fetchAllDirectMessageChannelMemberships = () => {
  return $.ajax({
    method: "GET",
    url: "/api/direct_message_channel_memberships"
  });
};

export const fetchSingleDirectMessageChannelMembership = id => {
  return $.ajax({
    method: "GET",
    url: `/api/direct_message_channel_memberships/${id}`
  });
};

export const createDirectMessageChannelMembership = membership => {
  return $.ajax({
    method: "POST",
    url: "/api/direct_message_channel_memberships",
    data: membership
  });
};

export const updateDirectMessageChannelMembership = membership => {
  return $.ajax({
    method: "PATCH",
    url: `/api/direct_message_channel_memberships/${membership.id}`,
    data: membership
  });
};

export const deleteDirectMessageChannelMembership = id => {
  return $.ajax({
    method: "DELETE",
    url: `/api/direct_message_channel_memberships/${id}`
  });
};
