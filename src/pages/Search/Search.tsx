import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchForm from '../../components/SearchForm/SearchForm';
import { getAllJob } from '../../services/jobService';
import { TbReceiptYen } from 'react-icons/tb';

interface Job {
    city: string[];
    createAt: string;
    description: string;
    id: number;
    idCompany: number;
    name: string;
    salary: string;
    tags: string[]
    updateAt: string
    status: boolean
}

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
        <div>
            <SearchForm />
        </div>
    )
}

export default Search