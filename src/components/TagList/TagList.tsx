import { useEffect, useState } from 'react';
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
    return (
        <div className='sm:py-0 container flex items-center font-semibold text-gray-50'>
            <div className='hidden sm:block sm:min-w-40'>Suggestions for you:</div>
            <div className="flex flex-wrap items-center justify-center gap-3">
                {tagList.map((item: { key: number, value: string }) => (
                    <div className='bg-transparent hover:bg-gray-600  hover:text-white rounded-full px-3 py-2 border border-gray-700 hover:border-transparent' key={item.key}>
                        <Link to={`/search?keyword=${item.value || ""}`} >{item.value}</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TagList