import { Link, useNavigate } from 'react-router-dom'
import { deleteAllCookies, getCookie } from '../../../helpers/cookie';
import { useDispatch } from 'react-redux';
import { checkAuth } from '../../../actions/actions';
import { Modal } from 'antd';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { useState } from 'react';
import { CiBoxList, CiGrid2H, CiLogin, CiLogout } from 'react-icons/ci';
import { VscSignIn } from 'react-icons/vsc';
import { PiNotePencilThin } from 'react-icons/pi';

const Header = () => {
    const token = getCookie("token");
    console.log(token)
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogOut = async () => {
        deleteAllCookies()
        dispatch(checkAuth(false))
        setOpen(true)
    }
    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
            navigate("/")
        }, 1500);
    };
    return (
        <>
            <Modal
                open={open}
                onOk={handleOk}
                footer={[
                ]}
                className='flex items-center justify-center'
            >
                <div className='w-[400px] h-[300px] flex flex-col justify-end items-center'>
                    <FaRegCircleCheck color="#F75D59" size={100} />
                    <p className='font-semibold mt-4 text-4xl text-gray-800'>Log out!</p>
                    <p className='mt-2 text-base'>Logging out successfully</p>
                    <div onClick={handleOk} className='flex justify-between items-center mt-8  text-lg px-8 cursor-pointer mx-auto py-3 hover:bg-red-700 text-center rounded-full bg-red-600 text-white font-bold'>
                        {loading && (
                            <svg className={`-ml-4 mr-4 w-5 h-5 text-gray-200 animate-spin dark:text-gray-800 fill-red-600`} viewBox="0 0 100 101" fill="none">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                        )}
                        <div>Ok</div>
                    </div>
                </div>
            </Modal>
            <div className=' fixed z-10 h-[66px] top-0 left-0 right-0 bg-gradient-to-r from-slate-900 to-red-900 text-gray-100'>
                <div className='px-4 sm:px-0 h-full sm:container mx-auto py-6 flex sm:font-bold items-center justify-between'>
                    <div className='flex items-center gap-20'>
                        <Link className="text-lg font-medium gap-2 items-center flex " to='/'>
                            <img className="w-10 h-10" src="src/assets/logo.png" alt="logo" />
                            <span>Portal</span>
                        </Link>
                        <div className='text-lg font-semibold justify-self-start flex gap-12'>
                            <Link to='/' className='hover:text-red-500'>
                                <span>Home</span>
                            </Link>
                            <Link to='/search?city=&keyword=' className=' hover:text-red-500'>
                                <span>Top jobs</span>
                            </Link>
                        </div>
                    </div>
                    {token === null ? (
                        <div className='font-semibold flex gap-12'>
                            <Link to='/login' className='flex items-center gap-1 hover:text-red-500'>
                                <CiLogin size={25} className='' />
                                <span>Login</span>
                            </Link>
                            <Link to='/register' className='flex items-center gap-1 hover:text-red-500'>
                                <PiNotePencilThin size={25} />
                                <span>Register</span>
                            </Link>
                        </div>
                    ) : (
                        <div className='font-semibold flex gap-12'>
                            <Link to='/admin' className='flex items-center gap-1 hover:text-red-500'>
                                <CiBoxList size={25} />
                                <span>Manage</span>

                            </Link>
                            <div className='cursor-pointer font-semibold flex items-center gap-1 hover:text-red-500' onClick={handleLogOut}>
                                <CiLogout size={25} />
                                <span>Log out</span>
                            </div>
                        </div>
                    )}
                </div>
                <div className='pt-[0.1px] bg-gray-600'></div>
            </div >
        </>
    )
}

export default Header