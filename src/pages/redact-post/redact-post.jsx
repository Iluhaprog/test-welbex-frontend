import * as React from "react"
import { useStore } from "effector-react"
import { Navigate } from "react-router-dom"
import { $authStore } from "../../shared/model/user"

export function RedactPostPage () {
	const isAuthorized = !!useStore($authStore).token

	return (
		<>
			{
				isAuthorized
					? (<></>)
					: (<Navigate to="/sign-in" />)
			}
		</>
	)
}
