import { REGISTER_INDIVIDUAL } from "../Types/registration";

const registerIndividual = (state) => {
  return {
    type: REGISTER_INDIVIDUAL,
    payload: { state },
  };
};

export default registerIndividual;
