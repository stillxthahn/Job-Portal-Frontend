import { Link } from 'react-router-dom'

const Header = () => {

    return (
        <div className=' fixed z-10 h-[66px] top-0 left-0 right-0 bg-gradient-to-r from-slate-900 to-red-900 text-gray-100'>
            <div className='px-4 sm:px-0 h-full sm:container mx-auto py-6 flex sm:font-bold items-center justify-between'>
                <div>
                    <Link className="text-lg sm:text-xl" to='/'>PORTAL</Link>
                </div>
                <div className='text-md sm:text-lg font-semibold flex gap-12'>
                    <Link to='/login'>Login</Link>
                    <Link to='/register'>Register</Link>
                </div>
            </div>
            <div className='pt-[0.25px] bg-gray-700'></div>
        </div >
    )
}

export default Header