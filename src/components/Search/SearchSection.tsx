import React from 'react'
import SearchForm from './SearchForm'
import TagList from '../TagList/TagList'

const SearchSection = () => {
    return (
        <div className='bg-purple-50 pb-10'>
            <div className='container px-4 sm:px-40 lg:px-60 mx-full max-w-screen'>
                <p className='pt-10 pb-8 sm:pb-2 font-bold text-center text-3xl sm:text-2xl sm:flex' > Find your <span className="mx-1 text-purple-600 sm:mx-2" > new job</span > today</p >
                <div className='hidden sm:text-lg sm:block sm:font-medium sm:text-gray-600'>Thousands of jobs in the computer, engineering and technology sectors are waiting for you.</div>
                <SearchForm />
                <TagList />
            </div>
        </div>
    )
}

export default SearchSection