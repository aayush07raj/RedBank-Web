import { LOGGING_IN } from "../Types/login";

const loggingIn = (state) => {
  return {
    type: LOGGING_IN,
    payload: { state },
  };
};

export default loggingIn;
