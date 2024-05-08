import { Company } from '../../interface/interface'
import { Link } from 'react-router-dom'
import { IoOpenOutline } from 'react-icons/io5'
interface CompanyCardProps {
	company: Company
}
const CompanyCard = ({ company }: CompanyCardProps) => {
	return (
		<div className={`px-5 py-4 bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)]`}>
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
	)
}

export default CompanyCard