import { Company, Job } from '../../interface/interface'
import { timeAgo } from '../../helpers/time'
import { LuCircleDollarSign } from 'react-icons/lu'
import { MdOutlineLocationOn } from 'react-icons/md'
import { RiHomeOfficeLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCompany } from '../../services/companyService'
interface JobCardProps {
    props: Job
    selected: boolean
}

const JobCard = ({ props, selected }: JobCardProps) => {
    const [company, setCompany] = useState<Company>()
    useEffect(() => {
        const fetchAPI = async () => {
            const response = await getCompany(props.idCompany)
            if (response) {
                setCompany(response)
            }
        }
        fetchAPI()
    }, [props.idCompany])
    const job = {
        ...props,
        createAt: timeAgo(props.createAt),
        updateAt: timeAgo(props.updateAt)
    }
    return (
        <div className={`flex w-full flex-wrap px-4 hover:border hover:border-orange-600 border ${selected ? 'bg-red-50 border-red-600' : 'bg-white'}  rounded-xl py-4`}>
            <div className='w-full text-sm text-gray-400 font-semibold'>{job.createAt}</div>
            <div className='w-full mt-3 text-xl font-bold max-w-80'>{job.name}</div>
            <div className='w-full flex mt-3 items-center gap-3'>
                <div className='w-12 h-12 flex bg-white border border-gray-300 rounded-md overflow-hidden rouned-lg justify-center items-center'><img className="rouned-lg" src={company?.logoUrl} alt="" /></div>
                <div className='text-gray-600 font-semibold'>{company?.companyName}</div>
            </div>
            <div className='flex items-center gap-2 font-bold text-gray-600 text-lg mt-3'>
                <LuCircleDollarSign color="gray" />
                <div>{job.salary}$</div>
            </div>
            <div className="w-full mt-3 border-[0.25px] border-dashed"></div>
            <div className='flex gap-2 w-full -ml-0.5 text-sm text-gray-600 items-center font-semibold mt-4'>
                <RiHomeOfficeLine color="gray" size={20} />
                <div className='flex gap-2'>
                    {job.location}
                </div>
            </div>
            <div className='flex gap-2 -ml-0.5 text-sm text-gray-600 items-center font-semibold mt-1'>
                <MdOutlineLocationOn color="gray" size={20} />
                <div className='flex gap-2'>
                    {job.city.map((item, index) => (
                        <div key={index}>{item}</div>
                    ))}
                </div>
            </div>
            <div className="flex gap-2 mt-3 w-full ">
                {job.tags.map((tag, index) => (
                    <div key={index} className="px-3 py-1 text-sm bg-white flex border border-1 rounded-2xl">{tag}</div>
                ))}
            </div>
        </div>
    )
}

export default JobCard
