import { useEffect, useState } from 'react'
import { CV, Job } from '../../interface/interface'
import { Link } from 'react-router-dom'
import { getCVByIdCompany } from '../../services/cvService'
import { getJobsByCompanyId } from '../../services/jobService'
import { getCookie } from '../../helpers/cookie'
import { Button, Tag, Tooltip } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import Table, { ColumnsType } from 'antd/es/table'
import DeleteCV from './DeleteCV'

export interface CVWithJobName extends CV {
	jobName: string
}



const CVList = () => {
	const idCompany = getCookie("id")
	const [cvs, setCVs] = useState<CV[]>()
	const [job, setJob] = useState<Job[]>()
	const [data, setData] = useState<CVWithJobName[]>()
	const fectAPI = async (idCompany: string) => {
		const CVResponse = await getCVByIdCompany(parseInt(idCompany))
		const jobResponse = await getJobsByCompanyId(parseInt(idCompany))
		if (CVResponse) {
			setCVs(CVResponse)
		}
		if (jobResponse) {
			setJob(jobResponse)
		}
	}
	const combineData = (cvs: CV[], job: Job[]) => {
		if (cvs?.length && job?.length) {
			const parseData = cvs.map((item) => {
				const cvJob = job.find((it) => {
					return it.id === item.idJob
				})
				return {
					...item,
					jobName: cvJob?.name || ""
				}
			})
			setData(parseData)
		}
	}
	useEffect(() => {
		fectAPI(idCompany)
	}, [idCompany])
	useEffect(() => {
		if (cvs && job) {
			combineData(cvs, job)
		}
	}, [cvs, job])
	console.log(idCompany)
	console.log(cvs)

	console.log(data)

	const columns: ColumnsType<CVWithJobName> = [
		{
			title: "Job name",
			dataIndex: "jobName",
			key: "jobName",
		},
		{
			title: "Full name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Phone number",
			dataIndex: "phone",
			key: "phone",
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "Sent at",
			dataIndex: "createAt",
			key: "createAt",
		},
		{
			title: "Status",
			dataIndex: "statusRead",
			key: "statusRead",
			render: (_, record: CVWithJobName) => (
				<>
					{record.statusRead ? (
						<Tag color="green">Read</Tag>
					) : (
						<Tag color="gray">Unread</Tag>
					)}
				</>
			)
		},
		{
			title: "Actions",
			dataIndex: "actions",
			render: (_, record: CVWithJobName) => (
				<div className='flex gap-2'	>
					<Link to={`/detail-cv/${record.id}`}>
						<Tooltip title="Detail">
							<Button icon={<EyeOutlined />}></Button>
						</Tooltip>
					</Link>
					<DeleteCV record={record} onReload={handleReload}></DeleteCV>
				</div>
			)
		},
	]
	const handleReload = () => {
		fectAPI(idCompany || "")
		if (cvs && job) {
			combineData(cvs, job)
		}
	}
	console.log(data)
	return (
		<div className='mt-4'>
			{data && (
				<Table dataSource={data} columns={columns} rowKey="id"></Table>
			)}
		</div>
	)
}

export default CVList