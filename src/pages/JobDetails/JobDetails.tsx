import { useEffect, useState } from "react"
import { Company, Job } from "../../interface/interface"
import { Link, useParams } from "react-router-dom"
import { getJob, getJobList } from "../../services/jobService"
import { getCompany } from "../../services/companyService"
import JobCard from "../../components/Jobs/JobCard"
import CompanyCard from "../../components/Employers/CompanyCard"
import InfoJob from "../../components/Jobs/InfoJob"
import Loading from "../../components/Loading/Loading"
const JobDetails = () => {
	const [job, setJob] = useState<Job>(undefined)
	const [company, setCompany] = useState<Company>()
	const [otherJobs, setOtherJobs] = useState<Job[]>()

	const params = useParams()
	const jobId = parseInt(params.id)

	useEffect(() => {
		const fetchAPI = async () => {
			setJob(undefined)
			const jobRes = await getJob(jobId)
			const others = await getJobList()
			if (jobRes) {
				const companyRes = await getCompany(jobRes.idCompany)
				if (companyRes) {
					setCompany(companyRes)
				}
				setJob(jobRes)
			}
			if (others) {
				setOtherJobs(others)
			}
		}
		fetchAPI()
	}, [jobId])
	if (!job || !company) {
		return (
			<div className='flex justify-center items-center mx-auto mt-32	'>
				<Loading size={12} ></Loading>
			</div>)
	}
	return (
		<>
			<div className="container pb-20  gap-6 mt-[88px] px-4">
				{/* first section */}
				<div className=" flex  w-full gap-6">
					<div className="flex flex-wrap md:basis-2/3">
						{/* // <InfoJob job={job} company={company} isPage={true}></InfoJob> */}
						<InfoJob job={job} company={company} isPage={true}></InfoJob>
					</div>
					<div className="hidden md:block md:basis-1/3 sticky top-[66px] self-start">
						<CompanyCard company={company}></CompanyCard>
					</div>
				</div>

				{/* second section */}
				{otherJobs ? (
					<>
						<div className="font-bold mt-10 text-2xl w-full">More jobs for you</div>
						<div className="overflow-x-scroll w-full mt-8 md:grid md:grid-cols-3 gap-8 flex">
							{otherJobs && otherJobs.map((job) => (
								<Link key={job.id} to={`/job/${job.id}`} className='flex-shrink-0 w-10/12 md:w-full'>
									<JobCard props={job} selected={false} />
								</Link>

							))}
						</div>
					</>
				) : (
					<div className='flex justify-center items-center mx-auto w-full my-10'>
						<Loading size={12} ></Loading>
					</div>
				)}
			</div >
		</>
	)
}

export default JobDetails