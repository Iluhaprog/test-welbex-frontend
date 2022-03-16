import { Input, Button, Upload, Spin } from "antd"
import { useStore } from "effector-react"
import * as React from "react"
import env from "react-dotenv"
import { $authStore } from "../../shared/model/user"
import { LoadingOutlined } from "@ant-design/icons"

export function Redactor () {
	const token = useStore($authStore).token
	const [ files, setFiles ] = React.useState([])
	const [ content, setContent ] = React.useState("")
	const [ isFetch, setIsFetch ] = React.useState(false)

	return (
		<>
			{ isFetch ? <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /> : <></>}
			<Input.TextArea rows={10} cols={40} onChange={(e) => setContent(e.target.value)}/>
			<Upload
				onChange={function ({ _, fileList }) {
					console.log(_)
					setFiles([ ...fileList ])
				}}
				onRemove={function (removedFile) {
					setFiles(files.filter(file => file.uid !== removedFile.uid))
				}}
			>
				<Button>Upload</Button>
			</Upload>
			<Button block type="primary" onClick={() => {
				setIsFetch(true)
				fetch(`${env.API_URL}/posts`, {
					method: "POST",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						content
					})
				})
					.then((res) => res.json())
					.then(data => {
						files.forEach((file) => {
							const fd = new FormData()
							fd.append("file", file.originFileObj)
							fetch(`${env.API_URL}/file/upload/${data.id}`, {
								method: "POST",
								headers: {
									Authorization: `Bearer ${token}`
								},
								body: fd
							})
						})
					})
					.then(() => setIsFetch(false))
			}}>Submit</Button>
		</>
	)
}
