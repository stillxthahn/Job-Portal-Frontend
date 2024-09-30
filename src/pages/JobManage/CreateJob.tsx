import { Button, Col, Form, Input, Row, Select, SelectProps, Switch, message } from 'antd'
import { getListTag } from '../../services/tagService'
import { getListCity } from '../../services/cityService'
import TextArea from 'antd/es/input/TextArea'
import { useEffect, useState } from 'react'
import { createJob } from '../../services/jobService'
import { useNavigate } from 'react-router-dom'
import { getCookie } from '../../helpers/cookie'
import { getTimeCurrent } from '../../helpers/getTime'

const rules = [
	{
		required: true,
		message: "Required!"
	}
]

const CreateJob = () => {
	const idCompany = getCookie("id")
	const companyName = getCookie("companyName")
	const logoUrl = getCookie("logoUrl")
	const [form] = Form.useForm()
	const navigate = useNavigate()
	const [mess, contextHolder] = message.useMessage()
	const [tags, setTags] = useState()
	const [city, setcity] = useState()
	useEffect(() => {
		const fetchAPI = async () => {
			const tagsResponse = await getListTag()
			const cityRespone = await getListCity()
			if (tagsResponse) {
				setTags(tagsResponse)
			}
			if (cityRespone) {
				setcity(cityRespone)
			}
		}
		fetchAPI()
	}, [])
	const handleFinish = async (values) => {
		const parseValues = {
			...values,
			id: Date.now(),
			idCompany: parseInt(idCompany),
			companyName: companyName,
			logoUrl: logoUrl,
			overview: !values.overview ? [] : values.overview.trim().split("\n").filter((item: string) => {
				return item.trim().length != 0
			}),
			experience: !values.experience ? [] : values.experience.trim().split("\n").filter((item: string) => {
				return item.trim().length != 0
			}),
			responsibilities: !values.responsibilities ? [] : values.responsibilities.trim().split("\n").filter((item: string) => {
				return item.trim().length != 0
			}),
			createAt: getTimeCurrent(),
			updateAt: getTimeCurrent()
		}
		const response = await createJob(parseValues)
		if (response) {
			mess.open({
				type: "success",
				content: "Create successfully!",
				duration: 10
			})
			setTimeout(() => {
				navigate(-1)
			}, 2000)
		}
		else {
			mess.open({
				type: "error",
				content: "Create failed!",
				duration: 3
			})
		}
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


	return (
		<>
			{contextHolder}
			<Form
				onFinish={handleFinish}
				layout='vertical'
				form={form}
			>
				<div className='w-full'>
					<div className='overflow-x-scroll flex w-98'>
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
					</div>
				</div>
			</Form>
		</>
	)
}

export default CreateJob