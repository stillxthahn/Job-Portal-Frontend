import { CVWithJobName } from './CVList'
import { Button, Popconfirm, Tooltip } from 'antd'
import { deleteCV } from '../../services/cvService'
import { DeleteOutlined } from '@ant-design/icons'
interface RecordProps {
	record: CVWithJobName
	onReload: () => void
}

const DeleteCV = ({ record, onReload }: RecordProps) => {
	const handleDelete = async () => {
		const response = await deleteCV(record.id)
		if (response) {
			console.log("DELETE")
			onReload()
		}
	}
	return (
		<>
			<Tooltip title="Delete CV">
				<Popconfirm title="Are you sure ?" onConfirm={handleDelete}>
					<Button danger ghost icon={<DeleteOutlined />}></Button>
				</Popconfirm>
			</Tooltip>
		</>
	)
}

export default DeleteCV