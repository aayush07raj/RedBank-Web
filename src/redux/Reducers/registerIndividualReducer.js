import { REGISTER_INDIVIDUAL } from "../Types/registration";

const initialState = {
  name: "",
  email: "",
  dob: "",
  phone: "",
  address: "",
  state: "",
  district: "",
  pincode: "",
  bg: "",
  password: "",
  cPassword: "",
  terms: false,
};

const registerIndividualReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_INDIVIDUAL: {
      console.log(action.payload);
      return action.payload;
    }

    default:
      return state;
  }
};

export default registerIndividualReducer;
