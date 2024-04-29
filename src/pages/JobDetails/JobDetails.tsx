import { useEffect, useState } from "react"
import { Company, Job } from "../../interface/interface"
import { Link, useParams } from "react-router-dom"
import { getJob, getJobList } from "../../services/jobService"
import { getCompany } from "../../services/companyService"
import { RiHomeOfficeLine } from "react-icons/ri"
import { MdOutlineLocationOn } from "react-icons/md"
import { LuCircleDollarSign } from "react-icons/lu"
import { timeAgo } from "../../helpers/time"
import { IoMdTime } from "react-icons/io"
import { IoOpenOutline } from "react-icons/io5"
import JobCard from "../../components/Jobs/JobCard"
import { useSticky } from "../../helpers/useSticky"
import InfoJob from "../../components/Jobs/InfoJob"
const JobDetails = () => {
	const [job, setJob] = useState<Job>()
	const [company, setCompany] = useState<Company>()
	const [otherJobs, setOtherJobs] = useState<Job[]>()
	const container = useSticky<HTMLDivElement>("root")

	const params = useParams()
	const jobId = params.id
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

	return (
		<div className=" flex flex-wrap w-full container pb-20 2xl:px-56 gap-6 mt-[88px]">
			{/* first section */}
			{job && company && (
				<InfoJob job={job} company={company} isPage={true}></InfoJob>
			)}

			{/* second section */}
			<div className="font-bold mt-8 text-2xl w-full">More jobs for you</div>

			<div className="w-full grid grid-cols-3 gap-8">
				{otherJobs && otherJobs.map((job, index) => (
					<JobCard key={index} props={job} selected={false} />
				))}
			</div>
		</div >
	)
}

export default JobDetails