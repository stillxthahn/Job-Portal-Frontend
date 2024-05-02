import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { checkExist, createCompany, login } from '../../services/companyService';
import { setCookie } from '../../helpers/cookie';
import { useDispatch } from 'react-redux';
import { checkAuth } from '../../actions/actions';
import { generateToken } from '../../helpers/generateToken';
import { Modal } from 'antd';
import { FaRegCircleCheck } from 'react-icons/fa6';

const Register = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [validEmail, setValidEmail] = useState<boolean>(true);
    const [validPhone, setValidPhone] = useState<boolean>(true);
    const [open, setOpen] = useState<boolean>(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSumbit = async (event: React.BaseSyntheticEvent) => {
        event.preventDefault()
        const name = event.currentTarget.name.value
        const phone = event.currentTarget.phone.value
        const email = event.currentTarget.email.value
        const password = event.currentTarget.password.value

        const checkEmail = await checkExist("email", email)
        const checkPhone = await checkExist("phone", phone)
        console.log(checkEmail)
        if (checkEmail.length !== 0 || checkPhone.length !== 0) {
            if (checkEmail.length !== 0) {
                setValidEmail(false)
            }
            else {
                setValidEmail(true)
            }
            if (checkPhone.length !== 0) {
                setValidPhone(false)
            }
            else {
                setValidPhone(true)
            }
        }
        else {
            const companyData = {
                companyName: name,
                email: email,
                password: password,
                token: generateToken(),
                companyType: "",
                companySize: 0,
                country: "",
                workingDays: "",
                overTimePolicy: "",
                phone: phone,
                quantityPeople: "",
                description: [],
                reason: [],
                why: [],
                address: [],
                city: [],
                website: "",
                logoUrl: "",
                tags: [],
                imageUrl: []
            }
            const respone = await createCompany(companyData)
            if (respone) {
                console.log(respone)
            }
            setOpen(true)
        }

    }
    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
            navigate(-1)
        }, 1500);
    };

    return (
        <div className='mt-[66px]'>
            <Modal
                open={open}
                onOk={handleOk}
                footer={[
                ]}
                className='flex items-center justify-center'
            >
                <div className='w-[40vw] h-[50vh] flex flex-col justify-end items-center'>
                    <FaRegCircleCheck color="#F75D59" size={100} />
                    <p className='font-semibold mt-4 text-4xl text-gray-800'>Awesome!</p>
                    <p className='mt-2 text-base'>Your company has been created</p>
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
            <div className='w-full bg-gradient-to-r from-slate-900 to-red-900 h-80 rounded-b-[20%] absolute  '></div>
            <div className='relative top-10 container pb-20 2xl:px-[500px] sm:px-[400px] gap-6'>
                <div className='bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] px-8 py-5 rounded-lg'>
                    <div className='text-3xl mt-1 text-center font-bold'>Register</div>
                    <form className='flex flex-col text-gray-800 font-semibold ' onSubmit={handleSumbit}>
                        <label className='mt-5 text-gray-600' htmlFor="name">Company name</label>
                        <input required className="text-lg mt-1 outline-none py-2 px-2 border border-gray-400  focus:border-red-500 focus:ring focus:ring-red-200 rounded-md" type="text" id='name' />
                        <label className='mt-5 text-gray-600' htmlFor="phone">Phone</label>
                        <input required className="text-lg mt-1 outline-none py-2 px-2 border border-gray-400  focus:border-red-500 focus:ring focus:ring-red-200 rounded-md" type="phone" id='phone' />
                        <div className={`${validPhone ? "hidden" : "mt-1 pl-0.5 text-red-600"}`}>Company's phone existed</div>

                        <label className={`${validPhone ? "mt-5" : "mt-2"}  text-gray-600`} htmlFor="email">Email</label>
                        <input required className="text-lg mt-1 outline-none py-2 px-2 border border-gray-400  focus:border-red-500 focus:ring focus:ring-red-200 rounded-md" type="email" id='email' />
                        <div className={`${validEmail ? "hidden" : "mt-1 pl-0.5 text-red-600"}`}>Company's email existed</div>

                        <label className={`${validEmail ? "mt-5" : "mt-2"}  text-gray-600`} htmlFor="password">Password</label>
                        <input required className="text-lg mt-1 outline-none py-2 px-2 border border-gray-400   focus:border-red-500 focus:ring focus:ring-red-200 rounded-md" type="password" id='password' />

                        <div className='flex items-center mt-5 justify-between'>
                            <button className="py-3 w-full hover:bg-red-700 text-center rounded-lg bg-red-600 text-white font-bold flex justify-center items-center" type='submit'>
                                {loading && (
                                    <svg className={`mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-800 fill-red-600`} viewBox="0 0 100 101" fill="none">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                )}
                                <div>Register</div>
                            </button>
                        </div>
                    </form>

                </div>
            </div >
        </div >
    )
}

export default Register