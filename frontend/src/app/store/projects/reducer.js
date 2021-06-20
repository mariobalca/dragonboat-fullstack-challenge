import {CREATE_PROJECT, DELETE_PROJECT, FETCH_PROJECT, FETCH_PROJECTS, UPDATE_PROJECT} from "./types";

const initialState = {
  byId: {},
  ids: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECTS: {
      const data = action.payload || [];
      return {
        ...state,
        byId: data.reduce((byId, p) => ({ ...byId, [p.id]: p }), state.byId),
        ids: data.map((p) => p.id),
      };
    }
    case FETCH_PROJECT: {
      const data = action.payload;

      if (!data) return state;

      return {
        ...state,
        byId: {
          ...state.byId,
          [data.id]: data,
        },
      };
    }
    case CREATE_PROJECT: {
      const data = action.payload
      state.ids.unshift(data.id)

      return {
        ...state,
        byId: {
          ...state.byId,
          [data.id]: data
        },
        ids: state.ids
      }
    }
    case UPDATE_PROJECT: {
      const data = action.payload

      return {
        ...state,
        byId: {
          ...state.byId,
          [data.id]: data
        }
      }
    }
    case DELETE_PROJECT: {
      const data = action.payload

      return {
        byId: Object.values(state.byId).reduce((byId, p) => {
          if (p.id !== data.id) byId[p.id] = p
          return byId
        }, {}),
        ids: state.ids.filter(id => id !== data.id)
      }
    }
    default: {
      return state;
    }
  }
};

export default reducer;
