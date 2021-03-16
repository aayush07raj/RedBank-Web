import { LOGGING_IN } from "../Types/login";

const initialLoginState = {
  isLoggedIn: false,
  userType: "",
  userToken: "",
  userId: "",
  donorStatus: 0,
};

const loggingInReducer = (state = initialLoginState, action) => {
  switch (action.type) {
    case LOGGING_IN: {
      return { ...action.payload, isLoggedIn: true };
    }
    case "LOGGING_OUT": {
      return initialLoginState;
    }
    case "SET_DONOR_STATUS": {
      console.log(action.donorStatus);
      return { ...state, donorStatus: action.donorStatus };
    }
    default:
      return state;
  }
};

export default loggingInReducer;
