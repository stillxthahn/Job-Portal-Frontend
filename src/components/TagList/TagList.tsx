import React, { useEffect, useState } from 'react'
import { getListTag } from '../../services/tagService';
import { Link } from 'react-router-dom';

const TagList = () => {
    const [tagList, setTagList] = useState([]);
    useEffect(() => {
        const fetchAPI = async () => {
            const respone = await getListTag();
            if (respone) {
                setTagList(respone)
            }
        }
        fetchAPI()
    }, [])
    console.log(tagList)
    return (
        <div className='px-4 sm:py-0 container flex font-semibold text-slate-800 items-center sm:gap-4 '>
            <div className='hidden sm:block'>Suggestions for you:</div>
            <div className="flex flex-wrap justify-between items-center gap-4">
                {tagList.map((item: { key: number, value: string }) => (
                    <div className='bg-transparent hover:bg-purple-500 text-purle-500 hover:text-white rounded-lg px-2 py-2 border border-purple-300 hover:border-transparent' key={item.key}>
                        <Link to={`/search?keyword=${item.value || ""}`} >{item.value}</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TagList