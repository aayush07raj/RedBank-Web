import { LOGGING_IN, LOGGING_OUT } from "../Types/login";

export const logging = (state) => {
  return {
    type: LOGGING_IN,
    payload: state,
  };
};

export const loggingOut = () => {
  return {
    type: LOGGING_OUT,
  };
};
