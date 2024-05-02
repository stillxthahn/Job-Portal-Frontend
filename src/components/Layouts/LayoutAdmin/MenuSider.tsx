import { Menu } from 'antd'
import {
	DashboardOutlined,
	UserOutlined,
	UnorderedListOutlined,
	FileDoneOutlined,
} from "@ant-design/icons";
import { Link } from 'react-router-dom'

const MenuSider = () => {
	const items = [
		{
			key: "/admin",
			icon: <DashboardOutlined />,
			label: <Link to="/admin">Dashboard</Link>,
		},
		{
			key: "/info-company",
			icon: <UserOutlined />,
			label: <Link to="/info-company">Company info</Link>,
		},
		{
			key: "/job-manage",
			icon: <UnorderedListOutlined />,
			label: <Link to="/job-manage">Job created</Link>,
		},
		{
			key: "/cv-manage",
			icon: <FileDoneOutlined />,
			label: <Link to="/cv-manage">CV applied</Link>,
		},
	]
	return (
		<div className='mt-[77px]'>
			<Menu
				items={items}
				mode="inline"
				defaultOpenKeys={["/dashboard"]}
				defaultSelectedKeys={[location.pathname]}
			/>
		</div>
	)
}

export default MenuSider