import { LOGGING_IN } from "../Types/login";

const initialLoginState = {
  isLoggedIn: false,
  userType: "",
  userToken: "",
  userId: "",
};

const loggingInReducer = (state = initialLoginState, action) => {
  switch (action.type) {
    case LOGGING_IN: {
      return action.payload;
    }
    default:
      return state;
  }
};

export default loggingInReducer;
