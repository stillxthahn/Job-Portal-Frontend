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

const InfoJob = () => {
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
			<div className=" flex w-full gap-6">
				{/* first col */}
				<div className="root flex basis-2/3 flex-wrap">
					{/* apply */}
					<div ref={container.ref} className={`flex flex-wrap w-full px-6 pt-6 pb-3 bg-white rounded-t-lg shadow-[0_-12px_30px_rgb(0,0,0,0.12)] sticky self-start top-[66px]`}>
						<div className={`text-3xl font-bold`}>{job?.name}</div>
						<div className={`${container.isSticky ? 'mt-6' : 'mt-2'} text-md w-full font-semibold text-gray-800 transition-all`}>{company?.companyName}</div>
						<div className={`${container.isSticky ? 'mt-2' : 'mt-1'} w-full flex items-center gap-2 font-bold text-gray-600 transition-all`}>
							<LuCircleDollarSign size={25} color="gray" />
							<div>Up to {job?.salary}$</div>
						</div>
						<div className="mt-4 text-center py-3 rounded-lg bg-red-600 text-white font-bold w-full">Apply now</div>
					</div>
					{/* company image */}
					<div className="flex flex-wrap w-full px-6 py-6 bg-white rounded-b-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
						<div className='w-full grid grid-cols-3 gap-2 '>
							{company?.imageUrl.map((url, index) => (
								<div key={index} className='overflow-hidden rounded-md'><img src={url} alt="" /></div>
							))}
						</div>
						<div className='flex gap-2 mt-6  items-center font-semibold text-gray-600 -ml-1'>
							<MdOutlineLocationOn color="gray" size={25} />
							<div>{company?.address[0]}</div>
						</div>
						<div className='flex gap-2.5 w-full -ml-1 text-gray-600 items-center font-semibold mt-3'>
							<RiHomeOfficeLine color="gray" size={21} />
							<div>
								{job?.location}
							</div>
						</div>
						<div className='flex gap-2 w-full -ml-1 text-gray-600 items-center font-semibold mt-3'>
							<IoMdTime color="gray" size={23} />
							<div className='flex gap-2'>
								<span>Posted</span>
								{timeAgo(job?.createAt || "")}
							</div>
						</div>
						<div className='flex gap-5 w-full -ml-1 text-gray-800 text-sm items-center mt-4 font-semibold'>
							<div>Skills:</div>
							<div className="flex gap-2">
								{job?.tags.map((tag, index) => (
									<div key={index} className='px-2 py-0.5 flex border border-1 rounded-2xl'>{tag}</div>
								))}
							</div>
						</div>
					</div>
					{/* reasons and description */}
					<div className="mt-6 flex flex-wrap w-full px-6 py-6 bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
						<div className="font-bold text-2xl w-full">Top 3 reasons to join us</div>
						<div className=' text-gray-900 font-medium mt-2 flex gap-2 flex-wrap'>
							{company?.reason.map((item, index) => (
								<div key={index} className='flex items-center gap-2 w-full'>
									<div className='w-1.5 bg-red-500 aspect-square rounded-full'></div>
									<div className="w-full" key={index}>{item}</div>
								</div>
							))}
						</div>

						<div className='w-full mt-6 border-[0.25px] border-dashed'></div>
						<div className="font-bold mt-3 text-2xl w-full">Job description</div>
						<div className="font-bold mt-2 text-lg w-full">Overview</div>
						<div className=' text-gray-900 font-medium mt-1'>
							{job?.overview.map((item, index) => (
								<div className="w-full mb-2" key={index}>{item}</div>
							))}
						</div>
						<div className="font-bold  text-lg w-full">Responsibilities</div>
						<div className='text-gray-900 font-medium mt-1'>
							{job?.responsibilities.map((item, index) => (
								<div key={index} className='flex items-center gap-2 w-full mb-1'>
									<div className='w-1.5 bg-red-500 aspect-square rounded-full'></div>
									<div className="w-full" key={index}>{item}</div>
								</div>
							))}
						</div>
						<div className='w-full mt-6 border-[0.25px] border-dashed'></div>
						<div className="font-bold mt-3 text-2xl w-full">Your skills and experience</div>
						<div className='text-gray-900 font-medium mt-2'>
							{job?.experience.map((item, index) => (
								<div key={index} className='flex items-center gap-2 w-full mb-1'>
									<div className='w-1.5 bg-red-500 aspect-square rounded-full'></div>
									<div className="w-full" key={index}>{item}</div>
								</div>
							))}
						</div>
						<div className='w-full mt-6 border-[0.25px] border-dashed'></div>
						<div className="font-bold mt-3 text-2xl w-full">Why you'll love working here</div>
						<div className='text-gray-900 font-medium mt-2'>
							{company?.why.map((item, index) => (
								<div key={index} className='flex items-center gap-2 w-full mb-1'>
									<div className='w-1.5 bg-red-500 aspect-square rounded-full'></div>
									<div className="w-full" key={index}>{item}</div>
								</div>
							))}
						</div>

					</div>


				</div>
				{/* second col */}
				<div className="flex basis-1/3 sticky self-start top-[66px]">
					<div className="flex flex-wrap w-full px-5 py-4 bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] sticky self-start">
						<div className="flex mt-2 gap-4 w-full">
							<div className=" w-[118px] aspect-square overflow-hidden border rounded-md border-gray-300 flex justify-center items-center"><img src={company?.logoUrl} alt="" /></div>
							<div>
								<div className="font-bold text-lg">{company?.companyName}</div>
								<Link to={`/company/${company?.id}`}>
									<div className="flex gap-2 text-blue-700 font-medium text-lg items-center">
										<div className="">View company</div>
										<IoOpenOutline />
									</div>
								</Link>
							</div>
						</div>
						<div className="text-gray-600 w-full mt-4 font-semibold text-lg">{company?.companyName}</div>
						<div className="flex justify-between items-center w-full mt-4 font-semibold">
							<div className=" text-gray-400 ">Company type</div>
							<div>{company?.companyType}</div>
						</div>
						<div className='w-full mt-2 border-[0.25px] border-dashed'></div>
						<div className="flex justify-between items-center w-full mt-2 font-semibold">
							<div className=" text-gray-400 ">Company size</div>
							<div>{company?.companySize}</div>
						</div>
						<div className='w-full mt-2 border-[0.25px] border-dashed'></div>
						<div className="flex justify-between items-center w-full mt-2 font-semibold">
							<div className=" text-gray-400 ">Country</div>
							<div>{company?.country}</div>
						</div>
						<div className='w-full mt-2 border-[0.25px] border-dashed'></div>
						<div className="flex justify-between items-center w-full mt-2 font-semibold">
							<div className=" text-gray-400 ">Workding days</div>
							<div>{company?.workingDays}</div>
						</div>
						<div className='w-full mt-2 border-[0.25px] border-dashed'></div>
						<div className="flex justify-between items-center w-full mt-2 font-semibold">
							<div className=" text-gray-400 ">Overtime policy</div>
							<div>{company?.overTimePolicy}</div>
						</div>


					</div>
				</div>
			</div>

			{/* second section */}
			<div className="font-bold mt-8 text-2xl w-full">More jobs for you</div>

			<div className="w-full grid grid-cols-3 gap-8">
				{otherJobs && otherJobs.map((job, index) => (
					<JobCard key={index} props={job} others={true} />
				))}
			</div>
		</div >
	)
}

export default InfoJob