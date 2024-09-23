/* eslint-disable no-unused-vars */
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import MenuSider from "./MenuSider";
import { useSelector } from "react-redux";
import Header from "../LayoutDefault/Header"
import { IRootState } from "../../../main";
const { Sider, Content } = Layout;


const LayoutAdmin = () => {
	const authen = useSelector((state: IRootState) => state['authReducer']);
	console.log(authen)
	return (
		<>
			<Layout className="h-full">
				<Header />
				<Layout>
					<div className="z-[2] fixed md:relative h-full  md:block md:z-auto">
						<Sider
							breakpoint="md"
							collapsedWidth="0"
							onBreakpoint={(broken) => {
								console.log(broken);
							}}
							onCollapse={(collapsed, type) => {
								console.log(collapsed, type);
							}}
							className="layout-admin__sider"
							theme="light"
							width={180}
						>
							<MenuSider />
						</Sider>
					</div>
					<Content className="mx-[28px] mt-[100px] mb-[40px] z-2 md:block md:z-[1]">
						<Outlet />
					</Content>
				</Layout>
			</Layout>
		</>
	);
}

export default LayoutAdmin