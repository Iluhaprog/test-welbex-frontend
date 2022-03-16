import * as React from "react"
import { AuthForm } from "../../feature/auth-form"
import { Layout, Row, Col } from "antd"

export function SignUpPage () {
	return (
		<Layout.Content>
			<Row justify="center" align="middle" style={{ height: "calc(100vh - 64px)" }}>
				<Col>
					<AuthForm type="sign-up" />
				</Col>
			</Row>
		</Layout.Content>
	)
}
