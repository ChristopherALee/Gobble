export const fetchAllMemberships = () => {
  return $.ajax({
    method: 'GET',
    url: '/api/memberships'
  });
};

export const fetchSingleMembership = (id) => {
  return $.ajax({
    method: 'GET',
    url: `/api/memberships/${id}`
  });
};

export const createMembership = (membership) => {
  return $.ajax({
    method: 'POST',
    url: '/api/memberships',
    data: membership
  });
};

export const updateMembership = (membership) => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/memberships/${membership.id}`,
    data: membership
  });
};

export const deleteMembership = (id) => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/memberships/${id}`
  });
};
