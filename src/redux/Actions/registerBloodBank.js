import { REGISTER_BLOODBANK } from "../Types/registration";

const registerBloodBank = (state) => {
  return {
    type: REGISTER_BLOODBANK,
    payload: { state },
  };
};

export default registerBloodBank;
