export const fetchUsers = () => {
  return $.ajax({
    method: 'GET',
    url: 'api/users'
  });
};

export const fetchSingleUser = (user) => {
  return $.ajax({
    method: 'GET',
    url: `api/users/${user}`
  });
};
