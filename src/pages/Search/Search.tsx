import { MouseEventHandler, useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import SearchForm from '../../components/Search/SearchForm';
import { getJobList, getJobsByCompanyId } from '../../services/jobService';
import { Company, Job } from '../../interface/interface';
import { getCompany } from '../../services/companyService';
import { MdOutlineLocationOn } from 'react-icons/md';
import { IoArrowForwardCircleOutline } from 'react-icons/io5';
import { IoIosArrowForward } from 'react-icons/io';
import JobCard from '../../components/Jobs/JobCard';
import JobApply from '../../components/Jobs/InfoJob';

const Search = () => {
    const [searchParams] = useSearchParams();
    const [data, setData] = useState<Job[]>();
    const [companySpotlight, setCompanySpotlight] = useState<Company>()
    const [jobSpotlight, setJobSpotlight] = useState<Job[]>()
    const citySearch = searchParams.get("city") || "";
    const keywordSearch = searchParams.get("keyword") || "";
    const [activeElement, setActiveElement] = useState(0)
    const [selectedElement, setSelectedElement] = useState<[Job, Company]>()

    useEffect(() => {
        const fetchAPI = async () => {
            const response = await getJobList()
            if (response) {
                const newData = response.filter((item: Job) => {
                    const city = citySearch ? item.city?.includes(citySearch) : true;
                    const tags = keywordSearch ? item.tags?.includes(keywordSearch) : true;
                    const name = keywordSearch ? item.name?.includes(keywordSearch) : true;
                    const status = item.status;
                    return city && (tags || name) && status
                })
                if (newData.length > 0 && newData) {
                    const company = await getCompany(newData[0]?.idCompany)
                    const jobCompany = await getJobsByCompanyId(company.id)
                    setJobSpotlight(jobCompany)
                    setCompanySpotlight(company)
                    setActiveElement(newData[0].id)
                    setSelectedElement([newData[0], company])
                }
                setData(newData);
            }
        }
        fetchAPI()
    }, [searchParams, citySearch, keywordSearch])
    console.log(data)

    const handleOnClick = (selectedJob: Job): MouseEventHandler => async () => {
        if (selectedJob.id !== activeElement) {
            const selectedCompany = await getCompany(selectedJob.idCompany)
            setActiveElement(selectedJob.id)
            setSelectedElement([selectedJob, selectedCompany])
            console.log("CLICK", selectedJob, selectedCompany)
        }
    }
    if (!data) {
        return null
    }
    return (
        <div className='bg-gray-100 text-gray-800 pb-20'>
            <div className='bg-gradient-to-r from-slate-900 to-red-900 md:pb-24 pt-8 mt-[66px] text-gray-50'>
                <div className='container px-4 sm:px-32  mx-full max-w-screen '>
                    <SearchForm />
                    {data?.length == 0 && (
                        <div className='text-center md:text-2xl text-lg font-bold md:mt-20 mt-2 pb-4 md:pb-0'>Sorry, we cannot find any suitable jobs for you :(</div>
                    )}
                </div>
            </div>
            {data?.length !== 0 && (
                <>
                    <div className='container  mx-full max-w-screen -mt-[100px]'>
                        <div className='hidden md:flex relative'>
                            <div className='w-[300px] shrink-0 h-[200px] basis-[300px] rounded-l-lg overflow-hidden'><img className="object-cover w-[300px] h-[200px]" src={companySpotlight?.imageUrl[0]} alt="" /></div>
                            {/* company des */}
                            <div className='flex bg-white basis-1/2 relative '>
                                {/* first col */}
                                <div className='pl-20 my-5 flex items-center border-r border-gray-400 border-dashed'>
                                    <div className='flex flex-wrap items-center gap-4'>
                                        <div className='w-full text-lg font-bold '>{companySpotlight?.companyName}</div>
                                        <div className='-ml-1 w-full flex items-center gap-1 font-semibold text-gray-600'>
                                            <MdOutlineLocationOn color="gray" size={20} />
                                            <div className='flex gap-2'>
                                                {companySpotlight?.city.map((item, index) => (
                                                    <div key={index}>{item}</div>
                                                ))}
                                            </div>
                                        </div>
                                        {jobSpotlight && jobSpotlight.length > 0 && (
                                            <Link to={`/company/${companySpotlight?.id}`}>
                                                <div className='w-full flex items-center font-semibold text-blue-600'>
                                                    <div className=''>View {jobSpotlight.length} jobs</div>
                                                    <IoIosArrowForward />
                                                </div>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                                <div className='bottom-[40px] -left-[60px] absolute w-[120px] sm:w-[120px] bg-white rounded-xl border border-gray-200 aspect-square overflow-hidden flex justify-center items-center'><img className='' src={companySpotlight?.logoUrl} alt="" /></div>
                            </div>
                            <div className='flex bg-white basis-1/2 rounded-r-lg'>
                                {/* second col */}
                                <div className='pl-6 my-auto'>
                                    <div className='flex flex-wrap items-center gap-4 font-semibold text-gray-800'>
                                        {jobSpotlight && jobSpotlight.slice(0, 3).map((item, index) => (
                                            <Link key={index} className="w-full" to={`/job/${item.id}`}>
                                                <div className='flex items-center gap-2 '>
                                                    <IoArrowForwardCircleOutline color="red" size={15} />
                                                    <div>{item.name}</div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className='absolute top-2 py-1.5 px-3 text-white font-bold text-sm bg-orange-400 rounded-r-lg  '>Company Spotlight</div>
                        </div>
                    </div>
                    <div className='container mx-full max-w-screen '>
                        <div className='hidden md:block  font-bold text-2xl mt-8'>{data.length} IT {`${data.length == 1 ? "job" : "jobs"}`} in Vietnam</div>
                        {selectedElement && (
                            <div className='flex md:mt-8 mt-32 gap-6 flex-col '>
                                {/* first col */}
                                <div className='md:hidden font-bold text-xl text-center'>{data.length} IT {`${data.length == 1 ? "job" : "jobs"}`} in Vietnam</div>

                                <div className='flex md:basis-2/6 flex-col gap-4 w-80 mx-auto'>
                                    {data && data.map((item) => (

                                        <div onClick={handleOnClick(item)} key={item.id} className='cursor-pointer'>
                                            <Link className="md:hidden" to={`/job/${item.id}`}>
                                                <JobCard props={item} selected={item.id === activeElement} />
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                                {/* second col */}
                                <div className='hidden md:block md:basis-4/6 sticky self-start top-[65px]'>
                                    <JobApply job={selectedElement[0]} company={selectedElement[1]} isPage={false}></JobApply>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
            {/* Company Spotlight */}
        </div>
    )
}

export default Search