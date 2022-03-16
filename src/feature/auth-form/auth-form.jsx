import * as React from "react"
import { Form, Input, Button } from "antd"
import env from "react-dotenv"
import PropTypes from "prop-types"
import { Navigate } from "react-router-dom"
import { $authStore, setToken } from "../../shared/model/user"
import { useStore } from "effector-react"

export function AuthForm ({
	type
}) {
	const isAuthorized = !!useStore($authStore).token

	const onFinish = (values) => {
		switch (type) {
		case "sign-in":
			signIn(values.username, values.password)
				.then((res) => res.json())
				.then(data => setToken(data.access_token))
			break
		case "sign-up":
			break
		}
	}

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo)
	}

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

function signIn (username, password, onComplete) {
	return fetch(`${env.API_URL}/auth/sign-in`, {
		method: "POST",
		headers: {
			Authorization: `Basic ${btoa(`${username}:${password}`)}`
		}
	})
}

// function signUp () {

// }
