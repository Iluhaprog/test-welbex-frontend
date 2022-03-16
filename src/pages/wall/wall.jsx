import { Layout } from "antd"
import * as React from "react"
import { useParams } from "react-router-dom"
import { Posts } from "../../entities/post/posts"

export function WallPage () {
	const { username } = useParams()

	return (
		<Layout.Content style={{ padding: "100px 50px" }}>
			{username
				? (
					<Posts username={username} />
				)
				: (
					<h2 style={{ textAlign: "center" }}>⚠️Enter right url <b>/wall/:username</b> ⚠️</h2>
				)}
		</Layout.Content>
	)
}
