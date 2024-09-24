import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CV, Job } from '../../interface/interface'
import { changeCVStatus, getCV } from '../../services/cvService'
import { getJob } from '../../services/jobService'
import { Button, Card, Tag } from 'antd'
import Loading from '../../components/Loading/Loading'

const CVDetails = () => {
	const params = useParams()
	const navigate = useNavigate()
	const [cv, setCV] = useState<CV>(undefined)
	const [job, setJob] = useState<Job>(undefined)
	useEffect(() => {
		const fetchAPI = async () => {
			const CVResponse = await getCV(params.id)
			console.log("CVResponse", CVResponse)
			if (CVResponse) {
				console.log(CVResponse.idJob)
				const jobResponse = await getJob(CVResponse.idJob)
				if (jobResponse) {
					setCV(CVResponse)
					setJob(jobResponse)
				}
			}
			changeCVStatus(params.id || "", { statusRead: true });
		}
		fetchAPI()
	}, [params])
	if (!cv || !job) {
		return <div className='flex justify-center items-center mx-auto mt-12'>
			<Loading size={12} ></Loading>
		</div>
	}
	return (
		<>
			<Button onClick={() => navigate(-1)}>Back</Button>
			<Card className="mt-4" title={`Candidate: ${cv?.name}`}>
				<div className="">Sent at:
					<span className='font-bold'> {cv.createAt}</span>
				</div>
				<div className='mt-3'>Phone number:
					<span className='font-bold'> {cv.phone}</span>
				</div>
				<div className='mt-3' >Email:
					<span className='font-bold'> {cv.email}</span>
				</div>
				<div className='mt-3' >City:
					<span className='font-bold'> {job.city[0]}</span>
				</div>
				<div className='mt-3' >Description:
					<span className='font-bold'> {cv.description}</span>
				</div>
				<div className='mt-3' >Link project:
					<span className='font-bold'> {cv.linkProject}</span>
				</div>
			</Card >
			<Card className="mt-4 pb-4" title={`Job ${job?.name}`}>
				<div className="">
					<span>Skills: </span>
					{job.tags.map((item, index) => (
						<Tag key={index} color="blue"> {item}</Tag>
					))}
				</div>
				<div className='mt-3'>Salary:
					<span className='font-bold'> {job.salary}</span>
				</div>
				<div className='mt-3' >
					<span>Overview:</span>
					<ul className='mt-2 ml-4 list-disc'>
						{job.overview.map((item, index) => (
							<li key={index}>{item}</li>
						))}
					</ul>

				</div>
			</Card >
		</>
	)
}

export default CVDetails