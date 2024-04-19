import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className='flex font-bold justify-between py-4'>
            <div>
                <Link className="text-3xl" to='/'>PORTAL</Link>
            </div>
            <div className='text-xl flex gap-8'>
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
            </div>

        </div >
    )
}

export default Header