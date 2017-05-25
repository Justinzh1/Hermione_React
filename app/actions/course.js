import moment from 'moment';
import cookie from 'react-cookie';
import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';

export function clearMessages() {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_CLASS_MESSAGES'
    });
  }
}

export function getUserCourses() {
  return (dispatch, getState) => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    });

    const params = 'courses=' + encodeURI(getState().auth.user.enrolled);

    return fetch('/getUserClasses?' + params, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'}
      })
      .then(response => response.json())
      .then(json => dispatch(fetchCourseSuccess(json)))
      .catch(error => dispatch(fetchCourseFailure(error)))
  };
}

export function fetchCourseSuccess(json) {
  return {
    type: 'GET_CLASSES_SUCCESS',
    courses: json.courses
  }
}

export function fetchCourseFailure(json) {
  return {
    type: 'GET_CLASSES_FAILURE',
  }
}


export function createCourse(input) {
  return (dispatch, getState) => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    });

    return fetch('/createClass', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: input.title,
        description: input.description,
        professors: input.professors,
        code: input.code,
        year: input.year,
        start: input.date,
        user: getState().user
      })
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: 'CREATE_CLASS_SUCCESS',
            messages: ["Class was created successfully"],
          })
        });
      } else {
        return response.json().then((json) => {
          dispatch({
            type: 'CREATE_CLASS_FAILURE',
            messages: ["Please check fields and try again."],
          })
        })
      }
    });
  };
}

export function enrollInClass(code) {
  return (dispatch, getState) => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    });
    return fetch('/enroll', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code: code,
        user: getState().auth.user
      })
    }).then((response) => {
      if (response.ok) {
        dispatch({
          type: 'ENROLL_IN_CLASS_SUCCESS',
          messages: ["Class was enrolled in successfull"],
        });
      } else {
        dispatch({
          type: 'ENROLL_IN_CLASS_FAILURE',
          messages: ["Please check code and try again"],
        });
      }
    });
  };
}

export function createVideoSuccess(json) {
  return {
    type: 'CREATE_VIDEO_SUCCESS',
  }
}

export function createVideoFailure(error) {
  return {
    type: 'CREATE_VIDEO_FAILURE',
  }
}

export function createVideo(video, title, year) {
  return (dispatch, getState) => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    });

    return fetch('/createVideo', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title,
        year: year,
        video: video
      })
    })
    .then(response => response.json())
    .then(json => dispatch(createVideoSuccess(json)))
    .catch(error => dispatch(createVideoFailure(error)))
  }
}
