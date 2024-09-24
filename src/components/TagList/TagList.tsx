import { useEffect, useState } from 'react';
import { getListTag } from '../../services/tagService';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';

const TagList = () => {
    const [tagList, setTagList] = useState(undefined);
    useEffect(() => {
        const fetchAPI = async () => {
            const respone = await getListTag(true);
            if (respone) {
                setTagList(respone)
            }
        }
        fetchAPI()
    }, [])
    if (!tagList) {
        console.log("tag loading")
        return (
            <div className='sm:py-0 container flex items-center font-semibold text-gray-50'>
                <div className='hidden sm:block sm:min-w-40'>Suggestions for you:</div>
                <div className='mx-auto mt-2 md:mx-0 md:mt-0'>
                    <Loading size={10} ></Loading>
                </div>
            </div>
        )
    }
    return (
        <div className='sm:py-0 container flex items-center font-semibold text-gray-50'>
            <div className='hidden sm:block sm:min-w-40'>Suggestions for you:</div>
            <div className="flex flex-wrap items-center justify-center md:gap-3 gap-2">
                {tagList.map((item: { key: number, value: string }) => (
                    <div className='bg-transparent hover:bg-gray-600  hover:text-white rounded-full md:px-3 md:py-2 px-2 py-1 border border-gray-700 hover:border-transparent text-sm' key={item.key}>
                        <Link to={`/search?keyword=${item.value || ""}`} >{item.value}</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TagList