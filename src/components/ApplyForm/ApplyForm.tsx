import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { getListCity } from '../../services/cityService'
import { City } from '../../interface/interface'
import { MdChevronLeft } from 'react-icons/md'
import { createCV } from '../../services/cvService'
import { getTimeCurrent } from '../../helpers/getTime'


const ApplyForm = () => {
	const [params, setParams] = useSearchParams()
	const jobName = params.get("name") || ""
	const idJob = params.get("job") || ""
	const idCompany = params.get("company") || ""
	const [city, setCity] = useState<City[]>()
	const navigate = useNavigate()
	useEffect(() => {
		const fetchAPI = async () => {
			const response = await getListCity()
			if (response) {
				setCity(response)
			}
		}
		fetchAPI()
	}, [])
	console.log(city)
	const handleSumbit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const target = event.target as typeof event.target & {
			name: { value: string };
			phone: { value: string };
			email: { value: string };
			city: { value: string };
			description: { value: string };
			linkProject: { value: string };
		};
		const values = {
			name: target.name.value,
			phone: target.phone.value,
			email: target.email.value,
			city: target.city.value,
			description: target.description.value,
			linkProject: target.linkProject.value,
			idJob: idJob,
			idCompany: idCompany,
			createdAt: getTimeCurrent(),
			statusRead: false
		}
		const response = await createCV(values);
		if (response) {
			console.log("SUBMITTED")
		}
	}
	return (
		<div className=' mt-[66px]'>
			<div className='w-[120vw] bg-gradient-to-r from-slate-900 to-red-900 h-80 rounded-b-[70%] absolute -left-[12%] '></div>
			<div className='relative top-10 container pb-20 2xl:px-[500px] gap-6'>
				<div className='bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] px-8 py-6 rounded-lg'>

					<div className='text-2xl font-bold'>{jobName}</div>
					<form className='flex flex-col text-gray-800 font-semibold ' onSubmit={handleSumbit}>
						<label className='mt-5 text-gray-600' htmlFor="name">Name</label>
						<input required className="text-lg mt-1 outline-none py-3 px-2 border border-gray-400  focus:border-red-500 focus:ring focus:ring-red-200 rounded-md" type="text" id='name' />
						<label className='mt-5 text-gray-600' htmlFor="phone">Phone</label>
						<input required className="text-lg mt-1 outline-none py-3 px-2 border border-gray-400   focus:border-red-500 focus:ring focus:ring-red-200 rounded-md" type="text" id='phone' />
						<label className='mt-5 text-gray-600' htmlFor="phone">Email</label>
						<input required className="text-lg mt-1 outline-none py-3 px-2 border border-gray-400   focus:border-red-500 focus:ring focus:ring-red-200 rounded-md" type="email" id='email' />
						<label className='mt-5 text-gray-600' htmlFor="city">City</label>
						<select required className="text-lg mt-1 outline-none py-3 px-2 border border-gray-400   focus:border-red-500 focus:ring focus:ring-red-200 rounded-md" id='city'>
							{city && city.map((item) => (
								<option className="text-lg" key={item.key} value={item.value}>{item.value}</option>
							))}
						</select>
						<label className='mt-5 text-gray-600' htmlFor="description">Description</label>
						<textarea rows={5} className="text-lg mt-1 outline-none py-3 px-2 border border-gray-400   focus:border-red-500 focus:ring focus:ring-red-200 rounded-md" id='description' />
						<label className='mt-5 text-gray-600' htmlFor="linkProject">Recent project link</label>
						<input required className="text-lg mt-1 outline-none py-3 px-2 border border-gray-400   focus:border-red-500 focus:ring focus:ring-red-200 rounded-md" type="text" id='linkProject' />
						<div className='flex items-center mt-5 justify-between'>
							{/* <div onClick={() => navigate(-1)} className='cursor-pointer flex gap-1 items-center text-lg font-semibold text-gray-800 hover:text-gray-400'>
								<MdChevronLeft size={25} />
								<div>Back</div>
							</div> */}
							<button className="py-3 w-full hover:bg-red-700 text-center rounded-lg bg-red-600 text-white font-bold" type='submit'>Apply my CV</button>
						</div>
					</form>

				</div>
			</div>
		</div >

	)
}

export default ApplyForm