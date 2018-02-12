export const RENDER_MENU = 'RENDER_MENU';
export const REMOVE_MENU = 'REMOVE_MENU';

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
