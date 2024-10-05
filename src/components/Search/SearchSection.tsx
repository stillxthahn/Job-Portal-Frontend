import SearchForm from './SearchForm'
import TagList from '../TagList/TagList'

const SearchSection = () => {
    return (
        <div className='bg-gradient-to-r from-slate-900 to-red-900 pb-10 pt-22 mt-[66px] text-gray-50'>
            <div className='container px-4 sm:px-32 2xl:px-20 mx-full max-w-screen'>
                <p className='pt-10 md:pb-8 pb-4 sm:pb-2 font-bold text-center text-2xl sm:text-4xl sm:flex' > Find your <span className="mx-1 text-red-500 sm:mx-2" > new job</span > today</p >
                <div className='hidden sm:text-lg sm:block sm:font-medium sm:text-gray-50'>Thousands of jobs in the computer, engineering and technology sector are waiting for you.</div>
                <SearchForm />
                <TagList />
            </div>
        </div>
    )
}

export default SearchSection