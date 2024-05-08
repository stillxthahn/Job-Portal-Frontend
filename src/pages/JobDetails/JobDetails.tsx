import { useEffect, useState } from "react"
import { Company, Job } from "../../interface/interface"
import { Link, useParams } from "react-router-dom"
import { getJob, getJobList } from "../../services/jobService"
import { getCompany } from "../../services/companyService"
import JobCard from "../../components/Jobs/JobCard"
import CompanyCard from "../../components/Employers/CompanyCard"
import InfoJob from "../../components/Jobs/InfoJob"
const JobDetails = () => {
	const [job, setJob] = useState<Job>()
	const [company, setCompany] = useState<Company>()
	const [otherJobs, setOtherJobs] = useState<Job[]>()

	const params = useParams()
	const jobId = parseInt(params.id)

	useEffect(() => {
		const fetchAPI = async () => {
			const jobRes = await getJob(jobId)
			const others = await getJobList(1, 7)
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
		return null
	}
	return (
		<>
			<div className="container pb-20  gap-6 mt-[88px]">
				{/* first section */}
				<div className=" flex  w-full gap-6 ">
					<div className="flex flex-wrap basis-2/3">
						{/* // <InfoJob job={job} company={company} isPage={true}></InfoJob> */}
						<InfoJob job={job} company={company} isPage={true}></InfoJob>
					</div>
					<div className="basis-1/3 sticky top-[66px] self-start">
						<CompanyCard company={company}></CompanyCard>
					</div>
				</div>

				{/* second section */}
				<div className="font-bold mt-10 text-2xl w-full">More jobs for you</div>

				<div className="w-full mt-8 grid grid-cols-3 gap-8">
					{otherJobs && otherJobs.map((job) => (
						<Link key={job.id} to={`/job/${job.id}`}>
							<JobCard props={job} selected={false} />
						</Link>

					))}
				</div>
			</div >
		</>
	)
}

export default JobDetails