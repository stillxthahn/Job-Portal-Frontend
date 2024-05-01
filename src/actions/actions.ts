export const checkAuth = (state: boolean) => {
	return {
		type: "CHECK_AUTH",
		status: state
	}
}