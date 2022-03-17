import * as React from "react"
import { Card, Image, Row, Col } from "antd"
import ReactPlayer from "react-player"
import PropTypes from "prop-types"
import { RemovePost } from "../../feature/remove-post"
import { UpdatePost } from "../../feature/update-post"

export function Post ({
	author,
	post,
	createdAt
}) {
	const [ otherFiles, setOtherFiles ] = React.useState([])

	React.useEffect(() => {
		const others = post.files.filter((file) => {
			return !/(?:jpg|gif|png|bmp|jpeg)$/.test(file.type) &&
							!/(mp4)$/.test(file.type)
		})
		setOtherFiles(others)
	}, [])

	return (
		<Card title={
			<Row justify="space-between" align="middle">
				<h4>
					<b>Author: </b>
					<p style={{ textDecoration: "underline" }}>{author}</p>
				</h4>
				<h5>
					<b>Created at:</b>
					{new Date(createdAt).toDateString()} - {new Date(createdAt).toTimeString().split(" ")[0]}
				</h5>
				<Row>
					<UpdatePost postId={post.id} />
					<RemovePost postId={post.id} />
				</Row>
			</Row>
		} >
			<p>
				{
					post.content
				}
			</p>
			<Row>
				{
					post.files.map((file) => {
						let res = null
						switch (true) {
						case /(?:jpg|gif|png|bmp|jpeg)$/.test(file.type):
							res = <Image key={file.url} width={100} height={100} src={file.url} style={{ border: "1px solid rgba(0,0,0,0.4)" }}/>
							break
						case /(mp4)$/.test(file.type):
							res = (
								<div style={{ background: "black" }} key={file.url} >
									<ReactPlayer url={file.url} width={200} height={100} controls/>
								</div>
							)
							break
						}
						return res
					})
				}
			</Row>
			{
				otherFiles.length
					? (
						<Row style={{ paddingTop: "20px" }}>
							<Col>
								{
									otherFiles.map((file) => (
										<div key={file.url}>
											<a href={file.url} target="_blank" rel="noreferrer">{file.url}</a>
										</div>
									))
								}
							</Col>
						</Row>
					)
					: (<></>)}
		</Card>
	)
}

Post.propTypes = {
	author: PropTypes.string,
	createdAt: PropTypes.string,
	post: PropTypes.shape({
		id: PropTypes.number,
		content: PropTypes.string,
		files: PropTypes.arrayOf(
			PropTypes.shape({
				url: PropTypes.string,
				type: PropTypes.string
			})
		)
	})
}
