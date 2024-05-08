import { useEffect, useState } from 'react'
import { getCookie } from '../../helpers/cookie'
import { getJobsByCompanyId } from '../../services/jobService'
import { CV, Company, Job } from '../../interface/interface'
import { getCVByIdCompany } from '../../services/cvService'
import { getCompany } from '../../services/companyService'
import { Card, Col, Row } from 'antd'
interface JobStatistic {
	total: number,
	statusTrue: number
	statusFalse: number
}
interface CVStatistic {
	total: number,
	readTrue: number
	readFalse: number
}
const DashBoard = () => {
	const idCompany = getCookie("id")
	const [job, setJob] = useState<JobStatistic>()
	const [CV, setCV] = useState<CVStatistic>()
	const [company, setCompany] = useState<Company>()
	useEffect(() => {
		const fetchAPI = async () => {
			const jobResponse = await getJobsByCompanyId(parseInt(idCompany))
			const CVResponse = await getCVByIdCompany(parseInt(idCompany))
			const companyResponse = await getCompany(parseInt(idCompany))
			if (jobResponse) {
				const obj = {
					total: 0,
					statusTrue: 0,
					statusFalse: 0
				}
				obj.total = jobResponse.length
				jobResponse.forEach((item: Job) => {
					item.status ? obj.statusTrue++ : obj.statusFalse++
				})
				setJob(obj)
			}
			if (CVResponse) {
				const obj = {
					total: 0,
					readTrue: 0,
					readFalse: 0
				}
				obj.total = CVResponse.length
				CVResponse.forEach((item: CV) => {
					item.statusRead ? obj.readTrue++ : obj.readFalse++
				})
				setCV(obj)
			}
			if (companyResponse) {
				setCompany(companyResponse)
			}
		}
		fetchAPI()
	}, [idCompany])
	console.log(job, CV, company)
	return (
		<>
			<div className='text-2xl font-bold'>General</div>
			<Row className='mt-4 mb-10' gutter={[20, 20]}>
				{job && (
					<Col span={8}>
						<Card title="Job" className="" size="small">
							<div>
								Jobs: <strong>{job.total}</strong>
							</div>
							<div>
								Activated: <strong>{job.statusTrue}</strong>
							</div>
							<div>
								Inactivated: <strong>{job.statusFalse}</strong>
							</div>
						</Card>
					</Col>

				)}
				{CV && (
					<Col span={8}>
						<Card title="CV" size="small">
							<div>
								CV: <strong>{CV.total}</strong>
							</div>
							<div>
								Read: <strong>{CV.readTrue}</strong>
							</div>
							<div>
								Unread: <strong>{CV.readFalse}</strong>
							</div>
						</Card>
					</Col>
				)}
				{company && (
					<Col span={8}>
						<Card title="Company" size="small">
							<div>
								Name: <strong>{company.companyName}</strong>
							</div>
							<div>
								Email: <strong>{company.email}</strong>
							</div>
							<div>
								Phone: <strong>{company.phone}</strong>
							</div>
							<div>
								Employees: <strong>{company.quantityPeople}</strong>
							</div>
						</Card>
					</Col>

				)}
			</Row>
		</>
	)
}

export default DashBoard