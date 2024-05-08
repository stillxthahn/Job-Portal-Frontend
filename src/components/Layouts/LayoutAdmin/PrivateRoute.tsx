import { getCookie } from '../../../helpers/cookie'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
	const token = getCookie("token")
	return (
		<>
			{token ? (<Outlet />) : (<Navigate to="/login" />)}
		</>
	)
}

export default PrivateRoute