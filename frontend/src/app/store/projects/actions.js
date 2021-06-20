import axios from "axios";
import {FETCH_PROJECTS, FETCH_PROJECT, CREATE_PROJECT, UPDATE_PROJECT, DELETE_PROJECT} from "./types";

export const fetchProjects = () => {
  return async (dispatch) =>
    dispatch({
      type: FETCH_PROJECTS,
      payload: await axios.get("/projects").then((data) => data.data),
    });
};

export const fetchProject = (id) => {
  return async (dispatch) =>
    dispatch({
      type: FETCH_PROJECT,
      payload: await axios.get(`/projects/${id}`).then((data) => data.data),
    });
};

export const createProject = (attrs) => {
  return async (dispatch) =>
    dispatch({
      type: CREATE_PROJECT,
      payload: await axios.post(`/projects`, attrs).then((data) => data.data)
    });
};

export const updateProject = (id, attrs) => {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_PROJECT,
      payload: await axios.put(`/projects/${id}`, attrs).then((data) => data.data)
    });
  }
};

export const deleteProject = (id) => {
  return async (dispatch) => {
    dispatch({
      type: DELETE_PROJECT,
      payload: await axios.delete(`/projects/${id}`).then((data) => data.data)
    });
  }
};