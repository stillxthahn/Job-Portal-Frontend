import { Link, useNavigate } from 'react-router-dom'
import { deleteAllCookies, getCookie } from '../../../helpers/cookie';
import { useDispatch } from 'react-redux';
import { checkAuth } from '../../../actions/actions';

const Header = () => {
    const token = getCookie("token");
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogOut = async () => {
        deleteAllCookies()
        dispatch(checkAuth(false))
        navigate("/")
    }

    return (
        <div className=' fixed z-10 h-[66px] top-0 left-0 right-0 bg-gradient-to-r from-slate-900 to-red-900 text-gray-100'>
            <div className='px-4 sm:px-0 h-full sm:container mx-auto py-6 flex sm:font-bold items-center justify-between'>
                <div>
                    <Link className="text-lg sm:text-xl" to='/'>PORTAL</Link>
                </div>
                {token === null ? (
                    <div className='text-md sm:text-lg font-semibold flex gap-12'>
                        <Link to='/login'>Login</Link>
                        <Link to='/register'>Register</Link>
                    </div>
                ) : (
                    <div className='text-md sm:text-lg font-semibold flex gap-12'>
                        <Link to='/login'>Manage</Link>
                        <div className='cursor-pointer' onClick={handleLogOut}>Logout</div>
                    </div>
                )}
            </div>
            <div className='pt-[0.25px] bg-gray-700'></div>
        </div >
    )
}

export default Header