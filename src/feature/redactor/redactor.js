import { Input, Button, Upload, Spin } from "antd"
import { useStore } from "effector-react"
import * as React from "react"
import env from "react-dotenv"
import { Navigate } from "react-router-dom"
import { $authStore } from "../../shared/model/user"
import { LoadingOutlined } from "@ant-design/icons"
import PropTypes from "prop-types"
import { $postsStore, cleanSelectedPost } from "../../entities/post/model"
import { showErrors, showSuccess } from "../../shared/lib/notifications"

export function Redactor ({ forUpdate }) {
	const token = useStore($authStore).token
	const selectedPost = useStore($postsStore).selected
	const [ files, setFiles ] = React.useState([])
	const [ content, setContent ] = React.useState()
	const [ isFetch, setIsFetch ] = React.useState(false)
	const [ fileToRemove, setFileToRemove ] = React.useState()

	React.useEffect(() => {
		if (forUpdate) setContent(selectedPost.content)
	}, [ ])

	React.useEffect(() => {
		if (fileToRemove?.url) {
			fetch(`${env.API_URL}/file/remove?url=${fileToRemove.url}`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
				.then(() => showSuccess())
				.then(() => setIsFetch(false))
				.catch((err) => showErrors(err))
		}
	}, [ fileToRemove?.uid ])

	if (!selectedPost && forUpdate) return <Navigate to={"/wall"} />

	return (
		<>
			{ isFetch ? <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /> : <></>}
			<Input.TextArea rows={10} cols={40} onChange={(e) => setContent(e.target.value)} value={content}/>
			<Upload
				defaultFileList={forUpdate
					? selectedPost.files.map((file, index) => ({
						uid: index,
						name: file.url.split("/").at(-1),
						url: file.url
					}))
					: []}
				onChange={function ({ file, fileList }) {
					file.isNew = true
					setFiles(fileList)
				}}
				onRemove={function (removedFile) {
					if (forUpdate && !removedFile.isNew) {
						setIsFetch(true)
						setFileToRemove((prev) => prev?.uid !== removedFile?.uid ? removedFile : prev)
					}
					setFiles(files.filter(file => file.uid !== removedFile.uid))
				}}
			>
				<Button>Upload</Button>
			</Upload>
			<Button block type="primary" onClick={() => {
				setIsFetch(true)
				fetch(`${env.API_URL}/posts`, {
					method: forUpdate ? "PUT" : "POST",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json"
					},
					body: JSON.stringify(forUpdate
						? {
							id: selectedPost.id,
							content
						}
						: {
							content
						})
				})
					.then((res) => res.json())
					.then(data => {
						files.forEach((file) => {
							if (file.isNew) {
								const fd = new FormData()
								fd.append("file", file.originFileObj)
								fetch(`${env.API_URL}/file/upload/${data.id}`, {
									method: "POST",
									headers: {
										Authorization: `Bearer ${token}`
									},
									body: fd
								})
							}
						})
					})
					.then(() => setIsFetch(false))
					.then(() => showSuccess())
					.catch((err) => showErrors(err))
			}}>Submit</Button>
		</>
	)
}

Redactor.propTypes = {
	forUpdate: PropTypes.bool
}
