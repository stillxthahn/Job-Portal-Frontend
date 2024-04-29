import React from 'react'
import { Company, Job } from "../../interface/interface"
import { useSticky } from "../../helpers/useSticky"
import { timeAgo } from '../../helpers/time'
import { LuCircleDollarSign } from 'react-icons/lu'
import { MdOutlineLocationOn } from 'react-icons/md'
import { RiHomeOfficeLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { IoMdTime } from 'react-icons/io'
import { IoOpenOutline } from 'react-icons/io5'

interface InfoJobProp {
	job: Job
	company: Company
	isPage: boolean
}
const InfoJob = ({ job, company, isPage }: InfoJobProp) => {
	const container = useSticky<HTMLDivElement>("root")

	return (
		<div className={`${isPage ? "flex w-full gap-6" : ""}`}>
			{/* first col */}
			<div className={`root ${isPage ? 'flex flex-wrap basis-2/3' : "sticky top-[65px] "}`}>
				{/* apply */}
				<div ref={container.ref} className={`flex flex-wrap w-full px-6 pt-6 pb-3 bg-white rounded-t-lg shadow-[0_-12px_30px_rgb(0,0,0,0.12)] sticky self-start top-[66px]`}>
					<div className={`max-w-[680px] text-3xl font-bold`}>{job?.name}</div>
					<div className={`${container.isSticky ? 'mt-6' : 'mt-2'} text-md w-full font-semibold text-gray-800 transition-all`}>{company?.companyName}</div>
					<div className={`${container.isSticky ? 'mt-2' : 'mt-1'} w-full flex items-center gap-2 font-bold text-gray-600 transition-all`}>
						<LuCircleDollarSign size={25} color="gray" />
						<div>Up to {job?.salary}$</div>
					</div>
					{!isPage && (
						<div className='absolute rounded-lg border border-gray-300 right-10 w-[100px] aspect-square flex justify-center items-center'><img className="" src={company.logoUrl} alt="" /></div>
					)}
					<div className="mt-4 text-center py-3 rounded-lg bg-red-600 text-white font-bold w-full">Apply now</div>
				</div>
				<div className={`${isPage ? '' : 'overflow-auto h-[55vh] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full'} flex flex-wrap w-full px-6 py-6 bg-white rounded-b-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)]`}>
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
					{/* reasons and description */}
					<div className='w-full mt-6 border-[0.25px] border-dashed'></div>

					{/* <div className="mt-6 flex flex-wrap w-full px-6 py-6 bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)]"> */}
					<div className="mt-3 font-bold text-2xl w-full">Top 3 reasons to join us</div>
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
					{/* </div> */}
				</div>
			</div >
			{/* Company */}
			{isPage && (
				<div className={`root flex flex-wrap basis-1/3 sticky self-start top-[66px] w-full px-5 py-4 bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)]`}>
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
			)}
		</div >

	)
}

export default InfoJob