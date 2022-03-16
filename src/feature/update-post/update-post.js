import * as React from "react"
import { Button } from "antd"
import { useStore } from "effector-react"
import PropTypes from "prop-types"
import { $authStore } from "../../shared/model/user"
import { selectPost } from "../../entities/post/model"
import { Navigate } from "react-router-dom"

export function UpdatePost ({ postId }) {
	const token = useStore($authStore).token
	const [ isRedirect, setIsRedirect ] = React.useState(false)

	if (isRedirect) return <Navigate to="/redact/update"/>

	return token
		? (
			<div>
				<Button block type="default" style={{ marginLeft: "10px" }} onClick={() => {
					selectPost({ id: postId })
					setIsRedirect(true)
				}}>
          Update
				</Button>
			</div>
		)
		: (<></>)
}

UpdatePost.propTypes = {
	postId: PropTypes.number
}
