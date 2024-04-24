import { useEffect, useState } from 'react'
import { getCompany } from '../../services/companyService'
import { Company } from '../../interface/interface'
import EmployerCard from './EmployerCard'

const TopEmployers = () => {
    const [company, setCompany] = useState([])
    useEffect(() => {
        const fetchAPI = async () => {
            const response = await getCompany();
            if (response) {
                setCompany(response)
            }
        }
        fetchAPI()
    }, [])
    return (
        <div className='container px-12 py-8 lg:px-60'>
            <div className='sm:pb-10 pb-5 text-center font-bold text-2xl mx-auto'>Top Employers</div>
            <div className='grid sm:grid-cols-3 sm:gap-10 gap-6'>
                {company && company.map((item: Company) => (
                    <EmployerCard props={item} key={item.id} />
                ))}
            </div>
        </div>
    )
}

export default TopEmployers