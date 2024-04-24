import { useEffect, useState } from 'react'
import { getCompany } from '../../services/companyService'
import EmployerCard from './EmployerCard'
import { getAllJob } from '../../services/jobService'
import { Company, CompanyWithJobsCount, Job } from '../../interface/interface'



const TopEmployers = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchAPI = async () => {
            const company = await getCompany();
            const jobs = await getAllJob();
            const dataFinal = company.map((item: Company) => {
                let count = 0;
                jobs.map((job: Job) => {
                    if (job.idCompany === item.id) count++
                })
                return {
                    ...item,
                    jobsCount: count
                }
            })
            setData(dataFinal)
        }
        fetchAPI()
    }, [])

    return (
        <div className='container px-16 py-8 sm:px-52'>
            <div className='sm:pb-10 pb-5 text-center font-bold text-2xl mx-auto'>Top Employers</div>
            <div className='flex flex-row flex-wrap gap-8 justify-center '>
                {data && data.map((item: CompanyWithJobsCount) => (
                    <EmployerCard props={item} key={item.id} />
                ))}
            </div>
        </div>
    )
}

export default TopEmployers