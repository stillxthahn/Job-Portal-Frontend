import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className='sticky z-10 top-0 left-0 right-0 bg-purple-50'>
            <div className='container px-4 mx-auto py-6 flex sm:font-bold items-center justify-between'>
                <div>
                    <Link className="text-lg sm:text-3xl" to='/'>PORTAL</Link>
                </div>
                <div className='text-md sm:text-xl flex gap-8'>
                    <Link to='/login'>Login</Link>
                    <Link to='/register'>Register</Link>
                </div>
            </div>
            <hr />
        </div >
    )
}

export default Header