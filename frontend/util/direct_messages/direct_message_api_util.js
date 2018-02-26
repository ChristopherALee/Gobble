export const fetchAllDirectMessages = () => {
  return $.ajax({
    method: "GET",
    url: "/api/direct_messages"
  });
};

export const fetchSingleDirectMessage = id => {
  return $.ajax({
    method: "GET",
    url: `/api/direct_messages/${id}`
  });
};

export const createDirectMessage = message => {
  return $.ajax({
    method: "POST",
    url: `/api/direct_messages`,
    data: message
  });
};

export const updateDirectMessage = message => {
  return $.ajax({
    method: "PATCH",
    url: `/api/direct_messages/${message.id}`,
    data: message
  });
};

export const destroyDirectMessage = id => {
  return $.ajax({
    method: "DELETE",
    url: `/api/direct_messages/${id}`
  });
};
