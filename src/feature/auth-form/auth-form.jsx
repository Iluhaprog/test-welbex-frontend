import * as React from "react"
import { Form, Input, Button } from "antd"

import PropTypes from "prop-types"
import { Navigate } from "react-router-dom"
import { useStore } from "effector-react"
import { $authStore, setToken } from "../../shared/model/user"
import { showSuccess, showErrors } from "../../shared/lib/notifications"

export function AuthForm ({
	type
}) {
	const isAuthorized = !!useStore($authStore).token
	const [ isCreated, setIsCreated ] = React.useState(false)

	const onFinish = (values) => {
		switch (type) {
		case "sign-in":
			signIn(values.username, values.password)
				.then(data => setToken(data.access_token))
			break
		case "sign-up":
			signUp(values.username, values.password)
				.then(() => {
					setIsCreated(true)
				})
			break
		}
	}

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo)
	}

	if (isCreated) return <Navigate to="/sign-in" />

	return isAuthorized
		? (
			<Navigate
				to="/wall"
			/>
		)
		: (
			<Form
				name="basic"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item
					label="Username"
					name="username"
					rules={[ { required: true, message: "Please input your username!" } ]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Password"
					name="password"
					rules={[ { required: true, message: "Please input your password!" } ]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type="primary" htmlType="submit">
          Submit
					</Button>
				</Form.Item>
			</Form>
		)
}

AuthForm.propTypes = {
	type: PropTypes.oneOf([ "sign-in", "sign-up" ])
}

function signIn (username, password) {
	return fetch(`${process.env.REACT_APP_API_URL}/auth/sign-in`, {
		method: "POST",
		headers: {
			Authorization: `Basic ${btoa(`${username}:${password}`)}`
		}
	})
		.then((res) => res.json())
}

function signUp (username, password) {
	return fetch(`${process.env.REACT_APP_API_URL}/auth/sign-up`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			username,
			password
		})
	})
		.then((res) => {
			if (res.status >= 400) return res.json()
			return ""
		})
		.then((data) => {
			if (data && data.error) {
				showErrors(data)
			} else {
				showSuccess()
			}
			return data
		})
}
