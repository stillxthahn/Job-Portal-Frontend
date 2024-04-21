import React from 'react'
import { Company } from '../../interface/interface'
import { Link } from 'react-router-dom'
interface CompanyProps {
    props: Company
}

const EmployerCard = ({ props }: CompanyProps) => {
    return (
        <Link to={`company/${props.id}`}>
            <div className='aspect-square rounded-xl border border-slate-300 bg-gray-200 flex flex-col overflow-hidden'>
                <div className='flex flex-col items-center justify-center'>
                    <div className='mt-10 drop-shadow-xl bg-white rounded-xl aspect-square w-[120px] flex items-center justify-center overflow-hidden'><img className="" src={props.imageUrl} alt="" /></div>
                    <p className='max-w-40 sm:max-w-60 text-sm sm:text-md font-bold mt-4 text-center'>{props.companyName}</p>
                    <div className='max-w-[240px] sm:max-w-60 flex gap-2 flex-wrap mt-2 mb-4 text-xs text-slate-800 font-semibold justify-center items-center'>
                        {props.tags.map((tag: string, index: number) => (
                            <div className="mt-1 px-2 py-0.5 bg-slate-100 rounded-xl" key={index}>{tag}</div>
                        ))}
                    </div>
                </div>
                <div className='flex text-xs text-slate-800 font-semibold px-3 py-3 bg-white'>
                    <div className='flex flex-row gap-4'>
                        {props.city.map((item: string, index: number) => (
                            <div key={index}>{item}</div>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default EmployerCard