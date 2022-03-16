import * as React from "react"
import { Button, Spin } from "antd"
import { useStore } from "effector-react"
import PropTypes from "prop-types"
import env from "react-dotenv"
import { $authStore } from "../../shared/model/user"
import { removePost } from "../../entities/post/model"
import { showSuccess } from "../../shared/lib/notifications"
import { LoadingOutlined } from "@ant-design/icons"

export function RemovePost ({ postId }) {
	const token = useStore($authStore).token
	const [ isFetch, setIsFetch ] = React.useState(false)

	return token
		? (
			<div>
				{ isFetch ? <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /> : <></>}
				<Button danger type="primary" style={{ marginLeft: "10px" }} onClick={() => {
					setIsFetch(true)
					remove(postId, token, setIsFetch)
				}}>
				Delete
				</Button>
			</div>
		)
		: (<></>)
}

RemovePost.propTypes = {
	postId: PropTypes.number
}

function remove (postId, token, setIsFetch) {
	fetch(`${env.API_URL}/posts/${postId}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`
		}
	}).then((res) => res)
		.then((data) => {
			setIsFetch(false)
			removePost(postId)
			showSuccess()
		})
}
