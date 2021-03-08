import { RESET_PASSWORD, VERIFY_OTP } from "../Types/resetPassword";

export const resetPassword = () => {
  return {
    type: RESET_PASSWORD,
  };
};

export const verifyOtp = () => {
  return {
    type: VERIFY_OTP,
  };
};