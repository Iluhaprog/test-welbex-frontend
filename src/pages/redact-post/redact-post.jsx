import * as React from "react"
import { useStore } from "effector-react"
import { Navigate } from "react-router-dom"
import { $authStore } from "../../shared/model/user"
import { Redactor } from "../../feature/redactor"
import { Layout } from "antd"

export function RedactPostPage () {
	const isAuthorized = !!useStore($authStore).token

	return (
		<Layout.Content style={{ padding: "100px 50px" }}>
			{
				isAuthorized
					? (<Redactor />)
					: (<Navigate to="/sign-in" />)
			}
		</Layout.Content>
	)
}
