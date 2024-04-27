import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className='fixed z-10 h-[88px] top-0 left-0 right-0 bg-purple-50'>
            <div className='px-4 sm:px-0 h-full sm:container mx-auto py-6 flex sm:font-bold items-center justify-between'>
                <div>
                    <Link className="text-lg sm:text-xl" to='/'>PORTAL</Link>
                </div>
                <div className='text-md sm:text-md flex gap-8'>
                    <Link to='/login'>Login</Link>
                    <Link to='/register'>Register</Link>
                </div>
            </div>
            <hr />
        </div >
    )
}

export default Header