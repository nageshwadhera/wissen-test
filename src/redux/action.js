import {
  SET_ENDPOINT,
  SET_USERLIST,
  SET_LOADER,
  SET_TOKEN
} from "./types";


export function setUserList(data) {
 
  return {
    type: SET_USERLIST,
    data,
  };
}

export function setEndPoint(data) {
  return {
    type: SET_ENDPOINT,
    data,
  };
}
export function setToken(data) {
  return {
    type: SET_TOKEN,
    data,
  };
}

export function showLoader(data){
  return{
    type: SET_LOADER,
    data,
  }
}

