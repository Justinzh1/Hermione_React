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
    case 'CLEAR_CLASS_MESSAGES':
      return Object.assign({}, state, {
        message: '',
      })
    case 'GET_CLASSES_SUCCESS':
      return Object.assign({}, state, {
        token: action.token,
        user: user,
        courses: action.courses
      })
    case 'GET_CLASSES_FAILURE':
    case 'CREATE_CLASS_FAILURE':
      return Object.assign({}, state, {
        message: 'Failed to create class.'
      })
    case 'CREATE_CLASS_SUCCESS':
      return Object.assign({}, state, {
        message: 'Successfully created class.'
      })
    case 'ENROLL_IN_CLASS_SUCCESS':
      return Object.assign({}, state, {
        message: 'Successfully enrolled in class.'
      })
    case 'ENROLL_IN_CLASS_FAILURE':
      return Object.assign({}, state, {
        message: 'Failed to enroll in class.'
      })
    case 'CREATE_VIDEO_SUCCESS':
      return Object.assign({}, state, {
        message: 'Successfully created video.'
      })
    case 'CREATE_VIDEO_FAILURE':
      return Object.assign({}, state, {
        message: 'Failed to create video.'
      })
    default:
      return state;
  }
}
