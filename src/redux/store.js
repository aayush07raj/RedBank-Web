import { createStore } from "redux";
import reducer from "./Reducers/Reducer";

const store = createStore(reducer);

export default store;
