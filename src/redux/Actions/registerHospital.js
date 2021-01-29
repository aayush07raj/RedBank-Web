import { REGISTER_HOSPITAL } from "../Types/registration";

const registerHospital = (state) => {
  return {
    type: REGISTER_HOSPITAL,
    payload: { state },
  };
};

export default registerHospital;
