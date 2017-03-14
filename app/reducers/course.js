const initialState = {
  token: null,
  user: {},
  courses: []
};

export default function getCourses(state = initialState, action, user) {
  if (!state.hydrated) {
    state = Object.assign({}, initialState, state, { hydrated: true });
  }
  switch (action.type) {
    case 'GET_CLASSES':
      return Object.assign({}, state, {
        token: action.token,
        user: user,
        courses: action.courses
      });
    default:
      return state;
  }
}
