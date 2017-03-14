import moment from 'moment';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

export function getUserCourses() {
  return (dispatch, getState) => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    });
    return fetch('/getClasses', {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        courses: getState().user.courses
      })
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
    });
  };
}

export function createCourse() {
  return (dispatch, getState) => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    });
    return fetch('/createClass', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        courses: getState().user.courses
      })
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
    });
  };
}