import { LOGGING_IN } from "../Types/login";

const initialLoginState = {
  isLoggedIn: false,
  userType: "",
};

const loggingInReducer = (state = initialLoginState, action) => {
  switch (action.type) {
    case LOGGING_IN: {
      console.log(action.payload);
      return action.payload;
    }
    default:
      return state;
  }
};

export default loggingInReducer;
