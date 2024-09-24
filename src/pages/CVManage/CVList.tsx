import { useEffect, useState } from 'react'
import { CV } from '../../interface/interface'
import { Link } from 'react-router-dom'
import { getCVByIdCompany } from '../../services/cvService'
import { getJobsByCompanyId } from '../../services/jobService'
import { getCookie } from '../../helpers/cookie'
import { Button, Tag, Tooltip } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import Table, { ColumnsType } from 'antd/es/table'
import DeleteCV from './DeleteCV'
import Loading from '../../components/Loading/Loading'

export interface CVWithJobName extends CV {
	jobName: string
}

const CVList = () => {
	const idCompany = getCookie("id")
	const [cvs, setCVs] = useState(undefined)
	const [job, setJob] = useState(undefined)
	const [data, setData] = useState(undefined)
	const fectAPI = async (idCompany) => {
		const CVResponse = await getCVByIdCompany(parseInt(idCompany))
		const jobResponse = await getJobsByCompanyId(parseInt(idCompany))
		if (!CVResponse.error) {
			setCVs(CVResponse)
			setJob(jobResponse)
			setData((prevData) => {
				if (CVResponse.length && jobResponse.length) {
					const parsedData = CVResponse.map((item) => {
						const cvJob = jobResponse.find((it) => it.id === item.idJob);
						return {
							...item,
							jobName: cvJob?.name || ""
						};
					});
					return parsedData;
				}
				return prevData;
			});
		}
		else {
			setCVs(undefined)
			setJob(undefined)
			setData(undefined)
		}
	}

	useEffect(() => {
		fectAPI(idCompany)
	}, [idCompany])
	if (!data) {
		return (
			<div className='flex justify-center items-center mx-auto mt-12'>
				<Loading size={12} ></Loading>
			</div>
		)
	}

	console.log(cvs)
	console.log(job)

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
		fectAPI(idCompany)
	}
	console.log(data)
	return (
		<div className='mt-4'>
			<Table scroll={{ x: 400 }} dataSource={data} columns={columns} rowKey="id"></Table>
		</div>
	)
}

export default CVList