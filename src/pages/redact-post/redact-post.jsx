import * as React from "react"
import { useStore } from "effector-react"
import { Navigate, useParams } from "react-router-dom"
import { $authStore } from "../../shared/model/user"
import { Redactor } from "../../feature/redactor"
import { Layout } from "antd"

export function RedactPostPage () {
	const { forUpdate } = useParams()
	const isAuthorized = !!useStore($authStore).token

	return (
		<Layout.Content style={{ padding: "100px 50px" }}>
			{
				isAuthorized
					? (<Redactor forUpdate={!!forUpdate} />)
					: (<Navigate to="/sign-in" />)
			}
		</Layout.Content>
	)
}
