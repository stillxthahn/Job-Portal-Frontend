import { combineReducers } from "redux";
import { authReducer } from "./authentication";

export const allReducers = combineReducers({
	authReducer,
})
