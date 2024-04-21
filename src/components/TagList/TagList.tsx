import React, { useEffect, useState } from 'react'
import { getListTag } from '../../services/tagService';
import { Link } from 'react-router-dom';

const TagList = () => {
    const [tagList, setTagList] = useState([]);
    useEffect(() => {
        const fetchAPI = async () => {
            const respone = await getListTag(true);
            if (respone) {
                setTagList(respone)
            }
        }
        fetchAPI()
    }, [])
    console.log(tagList)
    return (
        <div className='sm:py-0 container flex items-center font-semibold text-slate-800'>
            <div className='hidden sm:block sm:min-w-40'>Suggestions for you:</div>
            <div className="flex flex-wrap items-center justify-center gap-3">
                {tagList.map((item: { key: number, value: string }) => (
                    <div className='bg-transparent hover:bg-purple-500 text-purle-500 hover:text-white rounded-2xl px-3 py-1 border border-purple-300 hover:border-transparent' key={item.key}>
                        <Link to={`/search?keyword=${item.value || ""}`} >{item.value}</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TagList