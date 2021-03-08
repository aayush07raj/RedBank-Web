
import { RESET_PASSWORD, VERIFY_OTP } from "../Types/resetPassword";

const initialState = {
  isOtpVerified: false,
};

const resetPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD: {
      return initialState;
    }
    case VERIFY_OTP: {
      return { isOtpVerified: true };
    }
    default:
      return state;
  }
};

export default resetPasswordReducer;