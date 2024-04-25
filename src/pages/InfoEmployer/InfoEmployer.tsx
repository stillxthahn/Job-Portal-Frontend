import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCompany } from '../../services/companyService'
import { getJobsByCompanyId } from '../../services/jobService'
import { Company, Job } from '../../interface/interface'
import { MdOutlineLocationOn } from 'react-icons/md'
import { RiGlobalLine, RiPassValidLine } from 'react-icons/ri'
import { IconContext } from 'react-icons'


const InfoEmployer = () => {
    const params = useParams()
    const companyId = params.id || "";
    const [company, setCompany] = useState<Company>()
    const [jobs, setJobs] = useState<Array<Job>>()
    useEffect(() => {
        const fetchAPI = async () => {
            const companyRes = await getCompany(companyId)
            const jobsRes = await getJobsByCompanyId(companyId)
            if (companyRes) {
                setCompany(companyRes)
            }
            if (jobsRes) {
                setJobs(jobsRes)
            }
        }
        fetchAPI()
    }, [companyId])

    return (
        <div className='bg-gray-100' >
            <div className='bg-gradient-to-r from-slate-900 to-red-900 text-gray-50 '>
                <div className='hidden sm:flex container px-60 py-8'>
                    <div className='flex items-center justify-center gap-7'>
                        <div className='w-[140px] sm:w-[160px] bg-white rounded-xl aspect-square overflow-hidden flex justify-center items-center'><img className='' src={company?.logoUrl} alt="" /></div>
                        <div className='self-start flex flex-col gap-4'>
                            <div className='font-bold text-3xl'>{company?.companyName}</div>
                            <div className='flex gap-3 items-center font-semibold'>
                                <IconContext.Provider
                                    value={{ color: 'gray', }}
                                >
                                    <MdOutlineLocationOn size={20} />
                                </IconContext.Provider>
                                <div className='flex gap-2'>
                                    {company?.city.map((item, index) => (
                                        <div key={index}>{item}</div>
                                    ))}
                                </div>
                            </div>
                            <div className='flex gap-3 items-center font-semibold'>
                                <IconContext.Provider
                                    value={{ color: 'gray', }}
                                >
                                    <RiPassValidLine size={20} />
                                </IconContext.Provider>
                                <div>{jobs !== undefined ? jobs.length : 0} jobs available</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex container my-10 px-60'>
                <div className='flex gap-6'>
                    <div className='flex flex-wrap gap-6 basis-2/3'>
                        <div className='w-full py-2 px-8 bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)]'>
                            <div>
                                <div className='font-bold text-2xl py-4'>General information</div>
                                <div className='mt-2 border-[0.25px] border-dashed'></div>
                            </div>
                            <div className='grid grid-cols-3 my-4'>
                                <div className='flex flex-wrap font-semibold gap-0.5 mb-4'>
                                    <div className='w-full text-gray-400'>Company type</div>
                                    <div className='w-full text-lg'>{company?.companyType}</div>
                                </div>
                                <div className='flex flex-wrap font-semibold gap-0.5 mb-4'>
                                    <div className='w-full text-base text-gray-400'>Company size</div>
                                    <div className='w-full text-lg'>{company?.companySize}</div>
                                </div>
                                <div className='flex flex-wrap font-semibold gap-0.5 mb-4'>
                                    <div className='w-full text-base text-gray-400'>Country</div>
                                    <div className='w-full text-lg'>{company?.country}</div>
                                </div>
                                <div className='flex flex-wrap font-semibold gap-0.5'>
                                    <div className='w-full text-base text-gray-400'>Working days</div>
                                    <div className='w-full text-lg'>{company?.workingDays}</div>
                                </div>
                                <div className='flex flex-wrap font-semibold gap-0.5'>
                                    <div className='w-full text-base text-gray-400'>Overtime policy</div>
                                    <div className='w-full text-lg'>{company?.overTimePolicy}</div>
                                </div>
                            </div>
                        </div>
                        <div className='w-full pt-2 pb-6 px-8 bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)]'>
                            <div>
                                <div className='font-bold text-2xl py-4'>Company overview</div>
                                <div className='mt-2 border-[0.25px] border-dashed'></div>
                            </div>
                            <div className='font-medium text-lg text-gray-900 mt-4 mb-6'>
                                {company?.description.map((des) => (
                                    <div className='mt-4'>{des}</div>
                                ))}
                            </div>
                            <div className='mt-2 border-[0.25px] border-dashed'></div>
                            <a target="_blank" className='flex gap-1 items-center mt-4 text-blue-600 font-semibold' href={company?.website}>
                                <RiGlobalLine size={25} />
                                <div >Company website</div>
                            </a>
                        </div>
                        <div className='w-full pt-2 pb-6 px-8 bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)]'>
                            <div>
                                <div className='font-bold text-2xl py-4'>Our key skills</div>
                                <div className='mt-2 border-[0.25px] border-dashed'></div>
                            </div>
                            <div className='font-medium text-gray-900 mt-4 mb-6'>
                                <div>Our key skills</div>
                                <div className='flex gap-4 mt-5 '>
                                    {company?.tags.map((tag, index) => (
                                        <div key={index} className='px-2 py-0.5 flex border border-1 rounded-2xl'>{tag}</div>
                                    ))}
                                </div>

                            </div>
                            <div className='mt-2 border-[0.25px] border-dashed'></div>
                            <div className='flex gap-1 items-center mt-4 text-blue-600 font-semibold'>
                                <RiGlobalLine size={25} />
                                <a target="_blank" href={company?.website}>Company website</a>
                            </div>
                        </div>
                        <div className='w-full pt-2 pb-6 px-8 bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)]'>
                            <div>
                                <div className='font-bold text-2xl py-4'>Why you'll love working here</div>
                                <div className='mt-2 border-[0.25px] border-dashed'></div>
                            </div>
                            <div className=' font-bold text-gray-900 mt-4 mb-6 flex gap-2 flex-wrap'>
                                {company?.reason.map((item, index) => (
                                    <div className='flex items-center gap-2 w-full'>
                                        <div className='w-1.5 bg-red-500 aspect-square rounded-full'></div>
                                        <div className="w-full" key={index}>{item}</div>
                                    </div>
                                ))}
                            </div>
                            <div className='grid grid-cols-3 gap-2 mb-6'>
                                {company?.imageUrl.map((url) => (
                                    <div className='overflow-hidden rounded-md'><img src={url} alt="" /></div>
                                ))}
                            </div>
                            <div className='list-disc font-medium text-gray-900 mt-4 mb-6 text-base flex gap-2 flex-wrap'>
                                {company?.why.map((item, index) => (
                                    <div className='flex items-baseline gap-2 w-full'>
                                        <div className='w-1.5 bg-red-500 aspect-square rounded-full'></div>
                                        <div className="w-full" key={index}>{item}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='basis-1/3 items-start '>
                        <div className='font-bold text-2xl'>{jobs?.length} jobs available!</div>
                        <div className="mt-8 overflow-auto h-20 bg-white  rounded-lg ">Well, let me tell you something, funny boy. Y'know that little stamp, the one that says "New York Public Library"? Well that may not mean anything to you, but that means a lot to me. One whole hell of a lot.

                            Sure, go ahead, laugh if you want to. I've seen your type before: Flashy, making the scene, flaunting convention. Yeah, I know what you're thinking. What's this guy making such a big stink about old library books? Well, let me give you a hint, junior.

                            Maybe we can live without libraries, people like you and me. Maybe. Sure, we're too old to change the world, but what about that kid, sitting down, opening a book, right now, in a branch at the local library and finding drawings of pee-pees and wee-wees on the Cat in the Hat and the Five Chinese Brothers? Doesn't HE deserve better?

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoEmployer