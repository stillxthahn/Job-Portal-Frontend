import { MouseEventHandler, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCompany } from '../../services/companyService'
import { getJobsByCompanyId } from '../../services/jobService'
import { Company, JobWithCompany } from '../../interface/interface'
import { MdOutlineLocationOn } from 'react-icons/md'
import { RiGlobalLine, RiPassValidLine } from 'react-icons/ri'
import JobCard from '../../components/Jobs/JobCard'

const mapKey = process.env.VITE_MAP_API
const InfoEmployer = () => {
    const params = useParams()
    const companyId = parseInt(params.id)
    const [company, setCompany] = useState<Company>()
    const [jobs, setJobs] = useState<Array<JobWithCompany>>()
    const [activeElement, setActiveElement] = useState(0);
    const [activeMap, setActiveMap] = useState<string>()
    useEffect(() => {
        const fetchAPI = async () => {
            const companyRes = await getCompany(companyId)
            const jobsRes = await getJobsByCompanyId(companyId)
            if (companyRes) {
                setCompany(companyRes)
                setActiveMap(`https://www.google.com/maps/embed/v1/place?key=${mapKey}&q=${companyRes?.address[0]}`)
            }
            if (!jobsRes.error) {
                setJobs(jobsRes)
            }
        }
        fetchAPI()
    }, [companyId])

    const handleClick = (id: number): MouseEventHandler => () => {
        if (activeElement !== id) {
            setActiveElement(id)
            setActiveMap(`https://www.google.com/maps/embed/v1/place?key=${mapKey}&q=${company?.address[id]}`)
        }
    }
    console.log(jobs?.length)
    const city = company?.city.join(', ')
    console.log(city)
    return (
        <div className='bg-gray-100 mt-[66px] pb-4 '>
            {/* COMPANY */}
            <div className='bg-gradient-to-r from-slate-900 to-red-900 text-gray-50 px-4 '>
                <div className='container '>
                    <div className='flex container py-8'>
                        <div className='flex items-center justify-center md:gap-7 gap-3'>
                            <div className='w-[140px] sm:w-[160px] bg-white rounded-xl aspect-square overflow-hidden flex justify-center items-center'><img className='' src={company?.logoUrl} alt="" /></div>
                            <div className='self-start flex flex-col gap-4'>
                                <div className='font-bold text-2xl md:text-3xl'>{company?.companyName}</div>
                                <div className='flex md:gap-3 gap-2 items-center font-semibold'>
                                    <div className='flex w-[20px] md:w-[30px] aspect-square'>
                                        <MdOutlineLocationOn color="gray" size={20} />
                                    </div>
                                    <div className=' md:gap-2 md:text-base text-sm'>
                                        {city}
                                    </div>
                                </div>
                                {jobs && (
                                    <div className='flex gap-3 items-center font-semibold text-sm md:text-base'>
                                        <div className='flex w-[20px] md:w-[30px] aspect-square'>
                                            <RiPassValidLine color="gray" size={20} />
                                        </div>
                                        <div>{jobs.length} {jobs.length === 0 || jobs.length === 1 ? 'job' : 'jobs'} available</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MAIN */}
            <div className='flex container my-10 gap-6  px-4 sm:px-0 flex-wrap md:flex-nowrap '>
                <div className='flex w-full flex-wrap gap-6 md:basis-2/3'>
                    <div className='w-full py-2 px-8 bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)]'>
                        <div>
                            <div className='font-bold md:text-2xl text-lg md:py-4 py-2'>General information</div>
                            <div className='mt-2 border-[0.25px] border-dashed'></div>
                        </div>
                        <div className='grid md:grid-cols-3 grid-cols-2 my-4'>
                            <div className='flex flex-wrap font-semibold gap-0.5 mb-4'>
                                <div className='w-full text-sm text-gray-400'>Company type</div>
                                <div className='w-full md:md:text-lg text-sm'>{company?.companyType}</div>
                            </div>
                            <div className='flex flex-wrap font-semibold gap-0.5 mb-4'>
                                <div className='w-full text-sm text-gray-400'>Company size</div>
                                <div className='w-full md:text-lg text-sm'>{company?.companySize}</div>
                            </div>
                            <div className='flex flex-wrap font-semibold gap-0.5 mb-4'>
                                <div className='w-full text-sm text-gray-400'>Country</div>
                                <div className='w-full md:text-lg text-sm'>{company?.country}</div>
                            </div>
                            <div className='flex flex-wrap font-semibold gap-0.5'>
                                <div className='w-full text-sm text-gray-400'>Working days</div>
                                <div className='w-full md:text-lg text-sm'>{company?.workingDays}</div>
                            </div>
                            <div className='flex flex-wrap font-semibold gap-0.5'>
                                <div className='w-full text-sm text-gray-400'>Overtime policy</div>
                                <div className='w-full md:text-lg text-sm'>{company?.overTimePolicy}</div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full pt-2 pb-6 px-8 bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)]'>
                        <div>
                            <div className='font-bold md:text-2xl text-lg md:py-4 py-2'>Company overview</div>
                            <div className='mt-2 border-[0.25px] border-dashed'></div>
                        </div>
                        <div className='font-medium md:text-lg text-sm text-gray-900 mt-4 mb-6'>
                            {company?.description.map((des, index) => (
                                <div key={index} className='mt-4'>{des}</div>
                            ))}
                        </div>
                        <div className='mt-2 border-[0.25px] border-dashed'></div>
                        <a target="_blank" className='flex gap-1 items-center mt-4 text-blue-600 font-semibold md:text-lg text-sm' href={company?.website}>
                            <RiGlobalLine size={20} />
                            <div >Company website</div>
                        </a>
                    </div>
                    <div className='w-full pt-2 pb-6 px-8 bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)]'>
                        <div>
                            <div className='font-bold md:text-2xl text-lg md:py-4 py-2'>Our key skills</div>
                            <div className='mt-2 border-[0.25px] border-dashed'></div>
                        </div>
                        <div className='font-medium text-gray-900 mt-4 mb-6'>
                            <div className='text-sm md:text-base flex flex-wrap gap-2 sm:gap-4 mt-5 '>
                                {company?.tags.map((tag, index) => (
                                    <div key={index} className='px-2 py-0.5 flex border border-1 rounded-2xl'>{tag}</div>
                                ))}
                            </div>

                        </div>

                    </div>
                    <div className='w-full pt-2 pb-6 px-8 bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)]'>
                        <div>
                            <div className='font-bold md:text-2xl text-lg md:py-4 py-2'>Why you'll love working here</div>
                            <div className='mt-2 border-[0.25px] border-dashed'></div>
                        </div>
                        <div className='text-sm md:text-base font-bold text-gray-900 mt-4 mb-6 flex gap-2 flex-wrap'>
                            {company?.reason.map((item, index) => (
                                <div key={index} className='flex items-center gap-2 w-full'>
                                    <div className='w-1.5 bg-red-500 aspect-square rounded-full'></div>
                                    <div className="w-full" key={index}>{item}</div>
                                </div>
                            ))}
                        </div>
                        <div className='md:grid md:grid-cols-3 md:gap-2 mb-6 flex flex-col gap-2'>
                            {company?.imageUrl.map((url, index) => (
                                <div key={index} className='overflow-hidden rounded-md'><img className='w-full h-full' src={url} alt="" /></div>
                            ))}
                        </div>
                        <div className='text-sm md:text-base list-disc font-medium text-gray-900 mt-4 mb-6 flex gap-2 flex-wrap'>
                            {company?.why.map((item, index) => (
                                <div key={index} className='flex items-baseline gap-2 w-full'>
                                    <div className='w-1.5 bg-red-500 aspect-square rounded-full'></div>
                                    <div className="w-full" >{item}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='w-full pt-2 pb-6 px-8 bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)]'>
                        <div className=''>
                            <div className='font-bold md:text-2xl text-lg md:py-4 py-2'>Location</div>
                            <div className='mt-2 border-[0.25px] border-dashed'></div>
                        </div>
                        <div className='flex items-start mt-6 gap-4'>
                            <div className='text-sm md:text-base flex flex-wrap gap-5 md:basis-1/3 overflow-auto h-full font-medium'>
                                {company?.address.map((item, index) => (
                                    <div key={index} onClick={handleClick(index)} className={`flex  border-2 rounded-lg py-4 px-2 gap-4 justify-start items-start cursor-pointer
                                        ${activeElement === index && 'border-red-500'}`}>
                                        <div className='flex w-[20px] md:w-[30px] aspect-square'>
                                            <MdOutlineLocationOn color="red" size={50} />
                                        </div>
                                        <div>{item}</div>
                                    </div>
                                ))}
                            </div>
                            <div className='hidden sm:block sm:basis-2/3'>
                                <iframe loading="lazy" className="w-full aspect-square" src={activeMap}></iframe>
                            </div>
                        </div>

                    </div>
                </div>
                <div className=' md:block md:basis-1/3 md:sticky md:self-start md:top-[100px]  order-first md:order-last w-full'>
                    <div className='font-bold text-2xl mb-8'>{jobs?.length} {jobs?.length === 1 || jobs?.length === 0 ? 'job' : 'jobs'} available</div>

                    <div className="md:overflow-auto overflow-x-scroll flex md:w-full  gap-6 md:flex-wrap md:h-[70vh] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                        {jobs && jobs.map((job, index) => (
                            <Link key={index} to={`/job/${job.id}`} className='flex-shrink-0 w-10/12 md:w-full'>
                                <JobCard props={job} selected={false} />
                            </Link>

                        ))}

                    </div>
                </div>
            </div>
        </div >
    )
}

export default InfoEmployer