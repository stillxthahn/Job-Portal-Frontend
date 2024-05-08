import { Job } from '../../interface/interface'
import { Button, Popconfirm, Tooltip } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { deleteJob } from '../../services/jobService'
interface DeleteJobProps {
	record: Job
	onReload: () => void
}

const DeleteJob = ({ record, onReload }: DeleteJobProps) => {
	const handleDelete = async () => {
		const response = await deleteJob(record.id)
		if (response) {
			onReload()
		}
	}
	return (
		<>
			<Tooltip title="Delete">
				<Popconfirm title="Are you sure?" onConfirm={handleDelete}>
					<Button
						className="ml-5"
						danger
						ghost
						icon={<DeleteOutlined />}
					></Button>
				</Popconfirm>
			</Tooltip>
		</>
	)
}

export default DeleteJob