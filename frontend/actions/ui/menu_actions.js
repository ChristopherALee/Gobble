export const RENDER_MENU = "RENDER_MENU";
export const REMOVE_MENU = "REMOVE_MENU";
export const RENDER_CREATE_CHANNEL_MENU = "RENDER_CREATE_CHANNEL_MENU";
export const REMOVE_CREATE_CHANNEL_MENU = "REMOVE_CREATE_CHANNEL_MENU";
export const RENDER_CHANNEL_SEARCH_MENU = "RENDER_CHANNEL_SEARCH_MENU";
export const REMOVE_CHANNEL_SEARCH_MENU = "REMOVE_CHANNEL_SEARCH_MENU";
export const RENDER_CHANNEL_SETTINGS_MENU = "RENDER_CHANNEL_SETTINGS_MENU";
export const REMOVE_CHANNEL_SETTINGS_MENU = "REMOVE_CHANNEL_SETTINGS_MENU";
export const RENDER_DIRECT_MESSAGE_MENU = "RENDER_DIRECT_MESSAGE_MENU";
export const REMOVE_DIRECT_MESSAGE_MENU = "REMOVE_DIRECT_MESSAGE_MENU";
export const RENDER_LOADING = "RENDER_LOADING";

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

const renderChannelSettingsMenu = () => {
  return {
    type: RENDER_CHANNEL_SETTINGS_MENU,
    render: true
  };
};

const removeChannelSettingsMenu = () => {
  return {
    type: REMOVE_CHANNEL_SETTINGS_MENU,
    render: false
  };
};

const renderDirectMessageMenu = () => {
  return {
    type: RENDER_DIRECT_MESSAGE_MENU,
    render: true
  };
};

const removeDirectMessageMenu = () => {
  return {
    type: REMOVE_DIRECT_MESSAGE_MENU,
    render: false
  };
};

const renderLoading = () => {
  return {
    type: RENDER_LOADING,
    render: true
  };
};

const removeLoading = () => {
  return {
    type: RENDER_LOADING,
    render: false
  };
};

export const showMenu = () => dispatch => {
  return dispatch(renderMenu());
};

export const hideMenu = () => dispatch => {
  return dispatch(removeMenu());
};

export const showCreateChannelMenu = () => dispatch => {
  return dispatch(renderCreateChannelMenu());
};

export const hideCreateChannelMenu = () => dispatch => {
  return dispatch(removeCreateChannelMenu());
};

export const showChannelSearchMenu = () => dispatch => {
  return dispatch(renderChannelSearchMenu());
};

export const hideChannelSearchMenu = () => dispatch => {
  return dispatch(removeChannelSearchMenu());
};

export const showChannelSettingsMenu = () => dispatch => {
  return dispatch(renderChannelSettingsMenu());
};

export const hideChannelSettingsMenu = () => dispatch => {
  return dispatch(removeChannelSettingsMenu());
};

export const showDirectMessageMenu = () => dispatch => {
  return dispatch(renderDirectMessageMenu());
};

export const hideDirectMessageMenu = () => dispatch => {
  return dispatch(removeDirectMessageMenu());
};

export const showLoading = () => dispatch => {
  return dispatch(renderLoading());
};

export const hideLoading = () => dispatch => {
  return dispatch(removeLoading());
};
