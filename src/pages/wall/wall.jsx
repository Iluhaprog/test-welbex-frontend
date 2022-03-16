import { Layout } from "antd"
import * as React from "react"
import { Posts } from "../../entities/post/posts"

export function WallPage () {
	return (
		<Layout.Content style={{ padding: "100px 50px" }}>
			<Posts username="test-user-123" />
		</Layout.Content>
	)
}
