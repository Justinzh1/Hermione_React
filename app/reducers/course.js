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
    case 'GET_CLASSES_SUCCESS':
      return Object.assign({}, state, {
        token: action.token,
        user: user,
        courses: action.courses
      });
    case: 'GET_CLASSES_FAILURE':
    case 'CREATE_CLASS_SUCCESS':
    case 'CREATE_CLASS_FAILURE':
    default:
      return state;
  }
}
