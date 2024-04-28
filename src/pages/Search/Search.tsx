import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchForm from '../../components/Search/SearchForm';
import { getJob } from '../../services/jobService';
import { Job } from '../../interface/interface';

const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [data, setData] = useState([]);
    const citySearch = searchParams.get("city") || "";
    const keywordSearch = searchParams.get("keyword") || "";
    console.log(citySearch, keywordSearch);
    useEffect(() => {
        const fetchAPI = async () => {
            const response = await getJob()
            if (response) {
                const newData = response.filter((item: Job) => {
                    const city = citySearch ? item.city?.includes(citySearch) : true;
                    const keyword = keywordSearch ? item.tags?.includes(keywordSearch) : true;
                    const status = item.status;
                    return city && keyword && status
                })
                setData(newData.reverse());
            }
        }
        fetchAPI()
    }, [])
    console.log(data)
    return (
        <div className='bg-gradient-to-r from-slate-900 to-red-900 pb-24 mt-[66px] text-gray-50'>
            <div className='container px-4 sm:px-32 mx-full max-w-screen '>
                <SearchForm />
            </div>
        </div>
    )
}

export default Search