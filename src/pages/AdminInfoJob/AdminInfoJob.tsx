import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Job } from '../../interface/interface'
import { getJob } from '../../services/jobService'
import { Button, Tag } from 'antd'

const AdminInfoJob = () => {
	const params = useParams()
	const [job, setJob] = useState<Job>()
	const navigate = useNavigate()
	useEffect(() => {
		const fectAPI = async () => {
			const response = await getJob(parseInt(params.id))
			if (response) {
				setJob(response)
			}
		}
		fectAPI()
	}, [params])
	if (!job) {
		return null
	}
	return (
		<div>
			<Button onClick={() => navigate(-1)}>Back</Button>
			<div className='mt-4 text-3xl font-bold'>Job name: {job.name}</div>
			<div className='mt-4'>
				<span>Status: </span>
				{job.status ? (
					<Tag color="green">Active</Tag>
				) : (
					<Tag color="red">Inactive</Tag>
				)}
			</div>
			<div className='mt-4'>
				<span>Tags: </span>
				{job.tags.map((item, index) => (
					<Tag key={index} color="blue">{item}</Tag>
				))}
			</div>
			<div className='mt-4'>
				<span>City: </span>
				{job.city.map((item, index) => (
					<Tag key={index} color="green">{item}</Tag>
				))}
			</div>
			<div className='mt-4'>
				<span>Salary: </span>
				<span className='font-bold'>{job.salary}$</span>
			</div>
			<div className='mt-4'>
				<span>Created at: </span>
				<span className='font-bold'>{job.createAt}</span>
			</div>
			<div className='mt-4'>
				<span>Updated at: </span>
				<span className='font-bold'>{job.updateAt}</span>
			</div>
			<div className='mt-4'>
				<div>Overview: </div>
				<ol className='ml-5 mt-2 list-disc'>
					{job.overview.map((item, index) => (
						<li className="mt-1" key={index}>{item}</li>
					))}
				</ol>
			</div>
			<div className='mt-4'>
				<div>Responsibilities: </div>
				<ol className='ml-5 mt-2 list-disc'>
					{job.responsibilities.map((item, index) => (
						<li className="mt-1" key={index}>{item}</li>
					))}
				</ol>
			</div>
			<div className='mt-4'>
				<div>Experience: </div>
				<ol className='ml-5 mt-2 list-disc'>
					{job.experience.map((item, index) => (
						<li className="mt-1" key={index}>{item}</li>
					))}
				</ol>
			</div>
		</div>
	)
}

export default AdminInfoJob