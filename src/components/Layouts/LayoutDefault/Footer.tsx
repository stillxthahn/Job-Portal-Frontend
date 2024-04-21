import React from 'react'
import { Link } from 'react-router-dom'
import { TiSocialFacebook } from "react-icons/ti";
import { TiSocialLinkedin } from "react-icons/ti";
import { AiOutlineYoutube } from "react-icons/ai";
const Footer = () => {
    return (
        <footer>
            <div className='bg-slate-200 pt-14 shrink-0'>
                <div
                    className='sm:px-20 font-bold flex justify-around pb-14'
                >
                    <div className='flex flex-col gap-8'>
                        <div>
                            <Link className="text-3xl" to='/'>PORTAL</Link>
                        </div>
                        <div className='text-xl flex gap-4'>
                            <Link to='/login'>
                                <div className='border-2 border-black rounded-full flex items-center justify-center'>
                                    <TiSocialFacebook size={30} />
                                </div>
                            </Link>
                            <Link to='/login'>
                                <div className='border-2 border-black rounded-full'>
                                    <AiOutlineYoutube size={30} />
                                </div>
                            </Link>
                            <Link to='/login'>
                                <div className='border-2 border-black rounded-full'>
                                    <TiSocialLinkedin size={30} />
                                </div>

                            </Link>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='pb-2'>About Us</div>
                        <Link to='/'>Home</Link>
                        <Link to='/'>About Us</Link>
                        <Link to='/'>All Jobs</Link>
                        <Link to='/'>FAQ</Link>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='pb-2'>About Us</div>
                        <Link to='/'>Home</Link>
                        <Link to='/'>About Us</Link>
                        <Link to='/'>All Jobs</Link>
                        <Link to='/'>FAQ</Link>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='pb-2'>About Us</div>
                        <Link to='/'>Home</Link>
                        <Link to='/'>About Us</Link>
                        <Link to='/'>All Jobs</Link>
                        <Link to='/'>FAQ</Link>
                    </div>
                </div>
                <div className="bg-slate-400 h-0.5"></div>
                <div className='text-sm font-bold flex justify-center items-center py-4'>Copyright @stillxthahn</div>
            </div>
        </footer>
    )
}

export default Footer