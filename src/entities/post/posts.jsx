import * as React from "react"
import PropTypes from "prop-types"
import { Row, Col, Button } from "antd"
import { useStore } from "effector-react"
import { $postsStore, getPostsEvent } from "./model"
import { Post } from "./post"

export function Posts ({ username }) {
	const posts = useStore($postsStore)

	React.useEffect(() => {
		getPostsEvent({ username })
	}, [])

	return (
		<>
			{
				posts.elements.map((element) => (
					<Post
						key={element.id}
						createdAt={element.created_at}
						author={username}
						post={element}
					/>
				))
			}
			<Row justify="center">
				<Col span={4}>
					<Button block type="primary" onClick={() => getPostsEvent({ username })}>
            More
					</Button>
				</Col>
			</Row>
		</>
	)
}

Posts.propTypes = {
	username: PropTypes.string
}
