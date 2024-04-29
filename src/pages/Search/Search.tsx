import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchForm from '../../components/Search/SearchForm';
import { getJob } from '../../services/jobService';
import { Company, Job } from '../../interface/interface';
import { getCompany } from '../../services/companyService';
import { randomIntFromInterval } from '../../helpers/random';
import { MdOutlineLocationOn } from 'react-icons/md';

const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [data, setData] = useState<Job[]>();
    const [companySpotlight, setCompanySpotlight] = useState<Company>()
    const citySearch = searchParams.get("city") || "";
    const keywordSearch = searchParams.get("keyword") || "";
    useEffect(() => {
        const fetchAPI = async () => {
            const response = await getJob()
            if (response) {
                const newData = response.filter((item: Job) => {
                    const city = citySearch ? item.city?.includes(citySearch) : true;
                    const tags = keywordSearch ? item.tags?.includes(keywordSearch) : true;
                    const name = keywordSearch ? item.name?.includes(keywordSearch) : true;
                    const status = item.status;
                    return city && (tags || name) && status
                })
                const company = await getCompany(newData[0].idCompany)
                setData(newData.reverse());
                setCompanySpotlight(company)
            }
        }
        fetchAPI()
    }, [citySearch, keywordSearch])
    console.log(data)
    console.log(companySpotlight)
    if (data?.length == 0) {
        return (
            <div className='bg-gradient-to-r from-slate-900 to-red-900 pb-24 mt-[66px] text-gray-50'>
                <div className='container px-4 sm:px-32 2xl:px-56 mx-full max-w-screen '>
                    <SearchForm />
                </div>
                <div>We cannot find any suitable jobs for u :(</div>
            </div>
        )
    }
    return (
        <>
            <div className='bg-gradient-to-r from-slate-900 to-red-900 pb-24 mt-[66px] text-gray-50'>
                <div className='container px-4 sm:px-40 2xl:px-72 mx-full max-w-screen '>
                    <SearchForm />
                </div>
            </div>
            {/* Company Spotlight */}
            <div className='container px-4 sm:px-32 2xl:px-56 mx-full max-w-screen '>
                <div className='flex'>
                    <div className='rounded-l-lg overflow-hidden'><img src={companySpotlight?.imageUrl[0]} alt="" /></div>
                    {/* company des */}
                    <div className='flex flex-wrap flex-col'>
                        <div>{companySpotlight?.companyName}</div>
                        <div className='flex gap-3'>
                            <MdOutlineLocationOn color="gray" size={20} />
                            <div>
                                {companySpotlight?.city.map((item, index) => (
                                    <div key={index}>{item}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search