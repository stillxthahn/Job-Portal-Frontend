import { CompanyWithJobsCount } from '../../interface/interface'
import { Link, useNavigate } from 'react-router-dom'
import { HiOutlineStatusOnline } from 'react-icons/hi'
import { IconContext } from 'react-icons'
interface CompanyProps {
    props: CompanyWithJobsCount
}

const EmployerCard = ({ props }: CompanyProps) => {
    const navigate = useNavigate()
    const handleClick = (id: number) => {
        document.body.scrollIntoView({ behavior: "smooth", block: "start" });
        navigate(`/company/${id}`)
    }
    return (
        <div onClick={() => handleClick(props.id)} className='cursor-pointer flex flex-col border sm:w-[416px] w-[300px] aspect-square items-center justify-between rounded-xl gap-4 sm:gap-0'>
            <div className='w-[140px] sm:w-[160px] bg-white drop-shadow-xl rounded-xl aspect-square overflow-hidden flex justify-center items-center mt-8'><img className='' src={props.imageUrl} alt="" /></div>
            <div className='text-lg font-bold flex justify-center items-center text-center max-w-[240px]'><p>{props.companyName}</p></div>
            <div className='flex flex-row gap-2 sm:gap-3 flex-wrap font-medium justify-center items-center text-xs text-slate-600 sm:text-sm max-w-[220px] sm:max-w-[320px]'>
                {props.tags.map((item, index) => (
                    <div key={index} className='bg-gray-100  rounded-2xl px-2 py-1 sm:px-4 sm:py-0.5'>{item}</div>
                ))}
            </div>
            <div className='w-full flex text-xs sm:text-sm px-3 sm:px-4 font-medium py-2 sm:py-4  bg-gray-100 rounded-b-xl justify-between '>
                <div className='flex justify-center items-center gap-2.5 text-slate-600'>
                    {props.city.map((item, index) => (
                        <div key={index}>{item}</div>
                    ))}
                </div>
                <div className='flex justify-center items-center gap-1 text-md sm:text-base'>
                    <IconContext.Provider
                        value={{ color: 'green', size: '20px' }}>
                        <HiOutlineStatusOnline />
                    </IconContext.Provider>
                    {props.jobsCount} </div>
            </div>
        </div>
    )
}

export default EmployerCard