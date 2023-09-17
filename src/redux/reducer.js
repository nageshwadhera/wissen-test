import {
  SET_ENDPOINT,
  SET_USERLIST,
  SET_LOADER,
  SET_TOKEN
} from "./types";

const initialState = {
  endpoint: "https://reqres.in/api/",
  loggedIn: false,
  showLoader: false,
  token: "",
  userList: []
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERLIST:
      return {
        ...state,
        userList: action.data,
      };

    case SET_ENDPOINT:
      return {
        ...state,
        endpoint: action.data,
      };

    case SET_TOKEN:
      return {
        ...state,
        token: action.data,
        
      };

    case SET_LOADER:
      return {
        ...state,
        showLoader: action.data,
      };

    default:
      return state;
  }
};
