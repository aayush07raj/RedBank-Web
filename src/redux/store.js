import { createStore, combineReducers } from "redux";
import registerIndividualReducer from "./Reducers/registerIndividualReducer";
import registerHospitalReducer from "./Reducers/registerHospitalReducer";
import registerBloodBankReducer from "./Reducers/registerBloodBankReducer";
import loggingInReducer from "./Reducers/loggingInReducer";
import resetPasswordReducer from "./Reducers/resetPasswordReducer";

const rootReducer = combineReducers({
  individual: registerIndividualReducer,
  hospital: registerHospitalReducer,
  bloodbank: registerBloodBankReducer,
  loggedIn: loggingInReducer,
  resetPassword: resetPasswordReducer,
});
const store = createStore(rootReducer);

export default store;
