import React from 'react'
import SearchForm from '../../components/SearchForm/SearchForm'
import TagList from '../../components/TagList/TagList'

const Home = () => {
    return (
        <div className='bg-purple-50 pb-10'>
            <div className='container mx-full max-w-screen'>
                < p className='px-4 py-10 font-bold text-center text-3xl sm:text-4xl sm:flex pb-4' > Find your <span className="mx-1 text-purple-600 sm:mx-2" > new job</span > today</p >
                <div className='px-4 py-10 hidden sm:text-xl sm:inline sm:font-medium sm:text-gray-600'>Thousands of jobs in the computer, engineering and technology sectors are waiting for you.</div>
                <SearchForm />
                <TagList />
            </div>
        </div>

    )
}

export default Home