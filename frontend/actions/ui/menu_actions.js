export const RENDER_MENU = 'RENDER_MENU';
export const REMOVE_MENU = 'REMOVE_MENU';
export const RENDER_CREATE_CHANNEL_MENU = 'RENDER_CREATE_CHANNEL_MENU';
export const REMOVE_CREATE_CHANNEL_MENU = 'REMOVE_CREATE_CHANNEL_MENU';
export const RENDER_CHANNEL_SEARCH_MENU = 'RENDER_CHANNEL_SEARCH_MENU';
export const REMOVE_CHANNEL_SEARCH_MENU = 'REMOVE_CHANNEL_SEARCH_MENU';

const renderMenu = () => {
  return {
    type: RENDER_MENU,
    render: true
  };
};

const removeMenu = () => {
  return {
    type: REMOVE_MENU,
    render: false
  };
};

const renderCreateChannelMenu = () => {
  return {
    type: RENDER_CREATE_CHANNEL_MENU,
    render: true
  };
};

const removeCreateChannelMenu = () => {
  return {
    type: REMOVE_CREATE_CHANNEL_MENU,
    render: false
  };
};

const renderChannelSearchMenu = () => {
  return {
    type: RENDER_CHANNEL_SEARCH_MENU,
    render: true
  };
};

const removeChannelSearchMenu = () => {
  return {
    type: REMOVE_CHANNEL_SEARCH_MENU,
    render: false
  };
};

export const showMenu = () => dispatch => {
  return (
    dispatch(renderMenu())
  );
};

export const hideMenu = () => dispatch => {
  return (
    dispatch(removeMenu())
  );
};

export const showCreateChannelMenu = () => dispatch => {
  return (
    dispatch(renderCreateChannelMenu())
  );
};

export const hideCreateChannelMenu = () => dispatch => {
  return (
    dispatch(removeCreateChannelMenu())
  );
};

export const showChannelSearchMenu = () => dispatch => {
  return (
    dispatch(showChannelSearchMenu())
  );
};

export const hideChannelSearchMenu = () => dispatch => {
  return (
    dispatch(hideChannelSearchMenu())
  );
};
