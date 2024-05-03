import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import JobTable from './JobTable'

const JobManage = () => {
	return (
		<>
			<div className='text-2xl font-bold'>Jobs created</div>
			<Link to="/create-job">
				<Button className='mt-4' icon={<PlusOutlined />}>Create new one</Button>
			</Link>
			<JobTable></JobTable>
		</>
	)
}

export default JobManage