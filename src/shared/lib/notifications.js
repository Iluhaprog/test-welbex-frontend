import { notification } from "antd"

export function showErrors (err) {
	Array.isArray(err.message)
		? err.message.forEach((msg) => {
			notification.error({ description: msg })
		})
		: notification.error({ description: err.message })
}

export function showSuccess () {
	notification.success({
		description: "Complete!"
	})
}
