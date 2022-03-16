import * as React from "react"
import { Row, Layout, Menu, Typography, Col, Button } from "antd"
import { Link } from "react-router-dom"

export function Header () {
	const isAuthorized = false

	return (
		<Layout.Header>
			<Row>
				<Col span={2}>
					<Typography.Title level={2} style={{ color: "#fff", paddingTop: "8px" }}>
            Blog
					</Typography.Title>
				</Col>
				<Col span={17}>
					<Menu theme="dark" mode="horizontal">
						<Menu.Item>
							<Link to="/redact-post" key="redact-post-link">
                    Wall
							</Link>
						</Menu.Item>
						{isAuthorized
							? (<>
								<Menu.Item>
									<Link to="/redact-post" key="redact-post-link">
                    New post
									</Link>
								</Menu.Item>
								<Menu.Item>
									<Link to="/redact-post" key="redact-post-link">
                    My wall
									</Link>
								</Menu.Item>
							</>)
							: (<></>)}
					</Menu>
				</Col>
				{
					!isAuthorized
						? (

							<Col span={5}>
								<Row>
									<Col span={11}>
										<Link to="/sign-up">
											<Button block type="default">
                        Sign Up
											</Button>
										</Link>
									</Col>
									<Col span={11} style={{ marginLeft: "5px" }}>
										<Link to="/sign-In">
											<Button block type="primary">
                        Sign In
											</Button>
										</Link>
									</Col>
								</Row>
							</Col>
						)
						: (<></>)
				}
			</Row>
		</Layout.Header>
	)
}
