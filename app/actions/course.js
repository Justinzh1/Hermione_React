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
        return response.json().then((json) => {
          dispatch({
            type: 'GET_CLASSES_SUCCESS',
            messages: [json]
          });
        });
      } else {
        return response.json().then((json) => {
          dispatch({
            type: 'GET_CLASSES_FAILURE',
            messages: [json]
          });
        });
      }
    });
  };
}

export function createCourse() {
  return (dispatch, getState) => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    });
    console.log("Creating a class");
    return fetch('/createClass', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: { 
          title: getState().title,
          description: getState().description,
          professors: getState().professors,
          code: getState().code,
          year: getState().year,
        }
      })
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: 'CREATE_CLASS_SUCCESS',
            messages: [json]
          })
        });
      } else {
        return response.json().then((json) => {
          dispatch({
            type: 'CREATE_CLASS_FAILURE',
            messages: [json]
          })
        })
      }
    });
  };
}