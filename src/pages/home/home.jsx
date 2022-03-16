import * as React from "react"
import { Layout, Row, Typography } from "antd"

export function Home () {
	return (
		<Layout.Content >
			<Row justify="center" align="middle" style={{ height: "calc(100vh - 64px)" }}>
				<Typography.Title level={2} style={{ height: "50px" }}>
          Welcome to blog service!🖖
				</Typography.Title>
			</Row>
		</Layout.Content>
	)
}
