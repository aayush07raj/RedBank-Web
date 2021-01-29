import { REGISTER_BLOODBANK } from "../Types/registration";

const initialState = {
  name: "",
  email: "",
  license: "",
  phone: [""],
  address: "",
  state: "",
  district: "",
  pincode: "",
  password: "",
  cPassword: "",
  terms: false,
};

const registerBloodBankReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_BLOODBANK: {
      console.log(action.payload);
      return action.payload;
    }
    default:
      return state;
  }
};

export default registerBloodBankReducer;
