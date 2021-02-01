import { REGISTER_HOSPITAL } from "../Types/registration";

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

const registerHospitalReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_HOSPITAL: {
      console.log(action.payload);
      return action.payload;
    }

    default:
      return state;
  }
};

export default registerHospitalReducer;
