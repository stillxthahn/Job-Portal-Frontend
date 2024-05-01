import { AuthAction } from "../interface/interface";

export const authReducer = (state = false, action : AuthAction) => {
	if (action.type === "CHECK_AUTH") {
		return action.status
	}
	return state
}