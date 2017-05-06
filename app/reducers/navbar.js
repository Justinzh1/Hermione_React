const initialState = {
  token: null,
  user: {}
};

export default function isHome(state = initialState, action) {
  if (!state.hydrated) {
    state = Object.assign({}, initialState, state, { hydrated: true });
  }
  switch (action.type) {
    case 'HOME_TRUE':
      return Object.assign({}, state, {
        home: true
      });
    case 'HOME_FALSE':
      return Object.assign({}, state, {
        home: false
      });
    default:
      return state;
  }
}
