import { LOG_OUT, LOG_SUCCESS, LOG_FAILURE } from "./LogTypes";

export const LogOut = (logged, is_admin) => {
  return {
    type: LOG_OUT,
    logged,
    is_admin,
  };
};
export const LogSuccess = (data, logged, is_admin) => {
  return {
    type: LOG_SUCCESS,
    data,
    logged,
    is_admin,
  };
};
export const LogFailure = (error, logged, is_admin) => {
  return {
    type: LOG_FAILURE,
    error,
    logged,
    is_admin,
  };
};
