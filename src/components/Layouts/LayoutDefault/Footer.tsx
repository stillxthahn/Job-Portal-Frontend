import React from 'react'
import { Link } from 'react-router-dom'
import { TiSocialFacebook } from "react-icons/ti";
import { TiSocialLinkedin } from "react-icons/ti";
import { AiOutlineYoutube } from "react-icons/ai";
const Footer = () => {
    return (
        <footer>
            <div className='bg-gradient-to-r from-slate-900 to-red-900 pt-14 shrink-0 text-gray-400 '>
                <div className='container sm:px-40 2xl:px-56 font-bold justify-between pb-14 flex'>
                    <div className='flex flex-col sm:gap-8'>
                        <div>
                            <Link className="text-2xl text-gray-100" to='/'>PORTAL</Link>
                        </div>
                        <div className='text-xl flex gap-4'>
                            <Link to='/login'>
                                <div className='border-2 border-gray-700 px-2 py-2 rounded-full flex items-center justify-center'>
                                    <TiSocialFacebook size={25} />
                                </div>
                            </Link>
                            <Link to='/login'>
                                <div className='border-2 border-gray-700 px-2 py-2 rounded-full'>
                                    <AiOutlineYoutube size={25} />
                                </div>
                            </Link>
                            <Link to='/login'>
                                <div className='border-2 border-gray-700 px-2 py-2 rounded-full'>
                                    <TiSocialLinkedin size={25} />
                                </div>

                            </Link>
                        </div>
                    </div>
                    <div className='grid grid-cols-4 gap-40'>
                        <div className='flex flex-col gap-2 text-sm font-semibold'>
                            <div className='text-base text-gray-100 pb-2'>About Us</div>
                            <Link to='/'>Home</Link>
                            <Link to='/'>About Us</Link>
                            <Link to='/'>All Jobs</Link>
                            <Link to='/'>FAQ</Link>
                        </div>
                        <div className='flex flex-col gap-2 text-sm font-semibold'>
                            <div className='text-base text-gray-100 pb-2'>About Us</div>
                            <Link to='/'>Home</Link>
                            <Link to='/'>About Us</Link>
                            <Link to='/'>All Jobs</Link>
                            <Link to='/'>FAQ</Link>
                        </div>
                        <div className='flex flex-col gap-2 text-sm font-semibold'>
                            <div className='text-base text-gray-100 pb-2'>About Us</div>
                            <Link to='/'>Home</Link>
                            <Link to='/'>About Us</Link>
                            <Link to='/'>All Jobs</Link>
                            <Link to='/'>FAQ</Link>
                        </div>
                        <div className='flex flex-col gap-2 text-sm font-semibold'>
                            <div className='text-base text-gray-100 pb-2'>About Us</div>
                            <Link to='/'>Home</Link>
                            <Link to='/'>About Us</Link>
                            <Link to='/'>All Jobs</Link>
                            <Link to='/'>FAQ</Link>
                        </div>
                    </div>
                </div>
                <div className='pt-[0.25px] bg-gray-700'></div>

                <div className='text-xs font-semibold flex justify-center items-center py-3'>Copyright @stillxthahn</div>
            </div>
        </footer>
    )
}

export default Footer