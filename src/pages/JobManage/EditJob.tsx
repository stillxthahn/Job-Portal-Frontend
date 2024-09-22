import { useEffect, useState } from 'react'
import { Job } from '../../interface/interface'
import { Button, Col, Form, Input, Modal, Row, Select, SelectProps, Switch, Tooltip, message } from 'antd'
import { getListTag } from '../../services/tagService'
import { getListCity } from '../../services/cityService'
import { EditOutlined } from '@ant-design/icons'
import TextArea from 'antd/es/input/TextArea'
import { updateJob } from '../../services/jobService'
import { getTimeCurrent } from '../../helpers/getTime'
interface EditJobProps {
	record: Job
	onReload: () => void
}

const rules = [
	{
		required: true,
		message: "Required!"
	}
]

const EditJob = ({ record, onReload }: EditJobProps) => {
	const [form] = Form.useForm()
	const [tags, setTags] = useState()
	const [city, setCity] = useState()
	const parseRecord = record && {
		...record,
		overview: record.overview.join('\n'),
		experience: record.experience.join('\n'),
		responsibilities: record.responsibilities.join('\n')
	}

	const [mess, contextHolder] = message.useMessage();
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	const showModal = () => {
		setIsModalOpen(true);
	}
	const handleCancel = () => {
		form.resetFields()
		setIsModalOpen(false)
	}
	const locationOptions: SelectProps['options'] = [
		{
			label: "Hybrid",
			value: "Hybrid"
		},
		{
			label: "At office",
			value: "At office"
		}
	]
	useEffect(() => {
		const fetchAPI = async () => {
			const tagsResponse = await getListTag()
			const citiesResponse = await getListCity()
			if (tagsResponse) {
				setTags(tagsResponse)
			}
			if (citiesResponse) {
				setCity(citiesResponse)
			}
		}
		fetchAPI()
	}, [])
	const handleFinish = async (values) => {
		const parseValues = {
			...record,
			...values,
			overview: values.overview.trim().split("\n").filter((item: string) => {
				return item.trim().length != 0
			}),
			experience: values.experience.trim().split("\n").filter((item: string) => {
				return item.trim().length != 0
			}),
			responsibilities: values.responsibilities.trim().split("\n").filter((item: string) => {
				return item.trim().length != 0
			}),
			updateAt: getTimeCurrent(),
			id: record.id
		}

		const response = await updateJob(record.id, parseValues)
		if (response) {
			setIsModalOpen(false)
			onReload()
			mess.open({
				type: "success",
				content: "Update successfully!",
				duration: 5,
			});
		} else {
			mess.open({
				type: "error",
				content: "Update failed!",
				duration: 3,
			})
		}
	}
	return (
		<>
			{contextHolder}
			<Tooltip title="Customize">
				<Button
					onClick={showModal}
					className="ml-5"
					icon={<EditOutlined />}
					type="primary"
					ghost
				></Button>
			</Tooltip>

			<Modal
				title="Customize"
				open={isModalOpen}
				onCancel={handleCancel}
				width={1000}
				footer={null}
			>
				<Form
					onFinish={handleFinish}
					initialValues={parseRecord}
					layout='vertical'
					form={form}
				>
					<Row gutter={20}>
						<Col span={24}>
							<Form.Item label="Job name" name="name" rules={rules}>
								<Input />
							</Form.Item>
						</Col>
						<Col span={16}>
							<Form.Item label="Tags" name="tags" rules={rules}>
								<Select
									mode="multiple"
									allowClear
									style={{ width: '100%' }}
									placeholder="Please select"
									options={tags}
								/>
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item label="Salary" name="salary" rules={rules}>
								<Input addonAfter="$" />
							</Form.Item>
						</Col>
						<Col span={16}>
							<Form.Item label="City" name="city" rules={rules}>
								<Select
									mode="multiple"
									allowClear
									style={{ width: '100%' }}
									placeholder="Please select"
									options={city}
								/>
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item label="Location" name="location" rules={rules}>
								<Select
									allowClear
									style={{ width: '100%' }}
									placeholder="Please select"
									options={locationOptions}
								/>
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item label="Overview" name="overview">
								<TextArea rows={12} />
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item label="Responsibility" name="responsibilities">
								<TextArea rows={12} />
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item label="Experience" name="experience">
								<TextArea rows={12} />
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item label="Status" valuePropName='checked' name="status">
								<Switch checkedChildren="On" unCheckedChildren="Off" />
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item >
								<Button type="primary" htmlType='submit'>Update</Button>
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Modal>
		</>
	)
}

export default EditJob