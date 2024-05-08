import { CompanyWithJobsCount } from '../../interface/interface'
import { Link } from 'react-router-dom'
interface CompanyProps {
    props: CompanyWithJobsCount
}

const EmployerCard = ({ props }: CompanyProps) => {
    return (
        <Link to={`company/${props.id}`} className='cursor-pointer hover:border-orange-600 flex flex-col border sm:w-[416px] w-[300px] aspect-square items-center justify-between rounded-xl gap-4 sm:gap-0'>
            <div className='w-[140px] sm:w-[160px] bg-white drop-shadow-xl rounded-xl aspect-square overflow-hidden flex justify-center items-center mt-8'><img className='' src={props.logoUrl} alt="" /></div>
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
                {props.jobsCount > 0 &&
                    <div className='flex justify-center text-gray-800 items-center gap-2 text-md sm:text-base'>
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        {props.jobsCount} {props.jobsCount > 1 ? "jobs" : "job"} available</div>
                }
            </div>
        </Link>
    )
}

export default EmployerCard
