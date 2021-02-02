import { createStore, combineReducers } from "redux";
import registerIndividualReducer from "./Reducers/registerIndividualReducer";
import registerHospitalReducer from "./Reducers/registerHospitalReducer";
import registerBloodBankReducer from "./Reducers/registerBloodBankReducer";
import loggingInReducer from "./Reducers/loggingInReducer";

const rootReducer = combineReducers({
  individual: registerIndividualReducer,
  hospital: registerHospitalReducer,
  bloodbank: registerBloodBankReducer,
  loggedIn: loggingInReducer,
});
const store = createStore(rootReducer);

export default store;
