import React, { useEffect, useState } from 'react'
import { getCookie } from '../../helpers/cookie'
import { City, Company } from '../../interface/interface'
import { editCompany, getCompany } from '../../services/companyService'
import { Button, Card, Col, Form, Input, InputNumber, Row, Select, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { getListCity } from '../../services/cityService'
import { getListTag } from '../../services/tagService'

const AdminInfoCompany = () => {
	const rules = [
		{
			required: true,
			message: "Required!"
		}
	]
	const idCompany = getCookie("id")
	const [company, setCompany] = useState<Company>()
	const [city, setCity] = useState<City[]>()
	const [tags, setTags] = useState()
	const [isEdit, setIsEdit] = useState<boolean>(false)
	const [form] = Form.useForm()
	const [mess, contextHolder] = message.useMessage();
	const fetchAPI = async (idCompany: number | string) => {
		const companyResponse = await getCompany(idCompany)
		const cityResponse = await getListCity()
		const tagsResponse = await getListTag()
		if (companyResponse) {
			const stringCompany = {
				...companyResponse,
				description: companyResponse.description.join("\n"),
				address: companyResponse.address.join("\n"),
				reason: companyResponse.reason.join("\n"),
				why: companyResponse.why.join("\n"),
				imageUrl: companyResponse.imageUrl.join("\n")
			}
			setCompany(stringCompany)
		}
		if (cityResponse) {
			setCity(cityResponse)
		}
		if (tagsResponse) {
			setTags(tagsResponse)
		}
	}

	useEffect(() => {
		fetchAPI(idCompany)
	}, [idCompany])
	const handleFinish = async (values) => {
		console.log("FIRST VAL", values)
		const newValues = {
			...values,
			description: values.description.split("\n"),
			address: values.address.split("\n"),
			reason: values.reason.split("\n"),
			why: values.why.split("\n"),
			imageUrl: values.imageUrl.split("\n")
		}
		const response = await editCompany(idCompany, newValues)
		if (response) {
			mess.success("Update successfully!")
			fetchAPI(idCompany)
			setIsEdit(false)
		}
	}
	const handleChange = (value: string[]) => {
		console.log(`selected ${value}`);
	}
	const handleEdit = () => {
		setIsEdit(true)
	}
	const handleCancel = () => {
		setIsEdit(false)
		form.resetFields()
	}
	console.log(company?.reason)
	return (
		<>
			{contextHolder}
			{company && (
				<Card
					title="Company information"
					extra={
						!isEdit ? (
							<Button onClick={handleEdit}>Customize</Button>
						) : (
							<Button onClick={handleCancel}>Cancel</Button>
						)
					}
				>
					<Form
						layout="vertical"
						onFinish={handleFinish}
						initialValues={company}
						form={form}
						disabled={!isEdit}
					// disabled={ }
					>
						<Row gutter={24}>
							<Col span={24}>
								<Form.Item label="Company name" name="companyName" rules={rules}>
									<Input />
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item label="Email" name="email" rules={rules}>
									<Input />
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item label="Phone" name="phone">
									<Input />
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item label="Address" name="address">
									<Input />
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item label="Employess" name="quantityPeople">
									<InputNumber className='w-full' />
								</Form.Item>
							</Col>
							<Col span={16}>
								<Form.Item label="Working days" name="workingDays">
									<Input />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item label="Tag" name="tags">
									<Select
										mode="multiple"
										allowClear
										style={{ width: '100%' }}
										placeholder="Please select"
										onChange={handleChange}
										options={tags}
									/>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item label="City" name="city">
									<Select
										mode="multiple"
										allowClear
										style={{ width: '100%' }}
										placeholder="Please select"
										onChange={handleChange}
										options={city}
									/>
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item label="Company type" name="companyType">
									<Input />
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item label="Country" name="country">
									<Input />
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item label="Website" name="website">
									<Input />
								</Form.Item>
							</Col>
							<Col span={24}>
								<Form.Item label="Short description" name="description">
									<TextArea rows={8} />
								</Form.Item>
							</Col>
							<Col span={24}>
								<Form.Item label="Reasons" name="reason" >
									<TextArea rows={8} />
								</Form.Item>
							</Col>
							<Col span={24}>
								<Form.Item label="Benefits" name="why">
									<TextArea rows={8} />
								</Form.Item>
							</Col>
							<Col span={24}>
								<Form.Item label="Logo URL" name="logoUrl">
									<Input />
								</Form.Item>
							</Col>
							<Col span={24}>
								<Form.Item label="Image URL" name="imageUrl">
									<TextArea rows={8} />
								</Form.Item>
							</Col>
							{isEdit && (
								<Col span={24}>
									<Form.Item>
										<Button type="primary" htmlType='submit'>Update</Button>
										<Button className='ml-4' onClick={handleCancel}>Cancel</Button>
									</Form.Item>
								</Col>
							)}
						</Row>


					</Form>
				</Card>
			)}
		</>
	)
}

export default AdminInfoCompany