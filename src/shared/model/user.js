import { createStore, createEvent } from "effector"

export const setToken = createEvent()

export const $authStore = createStore({ token: "" })
	.on(setToken, (_, token) => ({ token }))
