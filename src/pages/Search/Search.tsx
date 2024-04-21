import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchForm from '../../components/Search/SearchForm';
import { getAllJob } from '../../services/jobService';
import { TbReceiptYen } from 'react-icons/tb';
import { Job } from '../../interface/interface';



const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [data, setData] = useState([]);
    const citySearch = searchParams.get("city") || "";
    const keywordSearch = searchParams.get("keyword") || "";
    console.log(citySearch, keywordSearch);
    useEffect(() => {
        const fetchAPI = async () => {
            const response = await getAllJob()
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
        <div className='bg-purple-50'>
            <div className='container sm:px-40 py-10 sm:py-0'>
                <SearchForm />
            </div>
        </div>
    )
}

export default Search