import React from 'react'
import { Company } from '../../interface/interface'
import { Link } from 'react-router-dom'
interface CompanyProps {
    props: Company
}

const EmployerCard = ({ props }: CompanyProps) => {
    return (
        <Link to={`company/${props.id}`}>
            <div className='rounded-xl bg-purple-50'>
                <div className='flex flex-col items-center pt-6 gap-4 aspect-square'>
                    <div className='bg-white w-[140px] aspect-square overflow-hidden object-cover flex justity-center items-center rounded shrink'><img className='rounded' src={props.imageUrl} alt="" /></div>
                    <p className='text-sm font-bold text-center max-w-[300px] grow'>{props.companyName}</p>
                    <div className='flex flex-row text-sm font-semibold gap-2 flex-wrap max-w-[300px] justify-center  shrink'>
                        {props.tags.map((item: string) => (
                            <div className='px-2 py-1 rounded-2xl bg-white '>{item}</div>
                        ))}
                    </div>
                    <div className='flex flex-row text-sm bg-slate-100 font-semibold text-slate-800 justify-between w-full px-5 py-4 rounded-b-xl'>
                        <div className='flex flex-row gap-1'>
                            {props.city.map((item: string) => (
                                <div>{item}</div>
                            ))}
                        </div>
                        <div>4</div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default EmployerCard

// < div className = 'aspect-square rounded-xl border border-slate-300 bg-gray-200 flex flex-col justify-end overflow-hidden' >
//             <div className='flex flex-col items-center grow'>
//                 <div className='drop-shadow-xl bg-white rounded-xl aspect-square w-[120px] lg:w-[160px] flex items-center justify-center overflow-hidden'><img className="" src={props.imageUrl} alt="" /></div>
//                 <p className='max-w-40 sm:max-w-60 lg:max-w-80 text-sm sm:text-md lg:text-xl font-bold mt-4 xl:mt-6 text-center'>{props.companyName}</p>
//                 <div className='max-w-[240px] sm:max-w-60 lg:max-w-80 flex gap-2 flex-wrap mt-2 lg:mt-6 lg:text-sm mb-4 text-xs text-slate-800 font-semibold justify-center items-center'>
//                     {props.tags.map((tag: string, index: number) => (
//                         <div className="mt-1 px-2 py-0.5 bg-slate-100 rounded-xl" key={index}>{tag}</div>
//                     ))}
//                 </div>
//             </div>
//             <div className='flex lg:text-sm text-xs text-slate-800 font-semibold px-3 py-3 bg-white'>
//                 <div className='flex flex-row gap-4'>
//                     {props.city.map((item: string, index: number) => (
//                         <div key={index}>{item}</div>
//                     ))}
//                 </div>
//             </div>
//         </ >