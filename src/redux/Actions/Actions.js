import { REGISTER_INDIVIDUAL } from "../Types/Types";

const registerIndividual = (state) => {
  return {
    type: REGISTER_INDIVIDUAL,
    payload: { state },
  };
};

export default registerIndividual;
