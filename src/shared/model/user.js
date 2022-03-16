import { createStore, createEvent } from "effector"
import connectLocalStorage from "effector-localstorage"

export const setToken = createEvent()

const authStoreLocalStorage = connectLocalStorage("auth")
	.onError((err) => console.log(err))

export const $authStore = createStore(authStoreLocalStorage.init({ token: "" }))
	.on(setToken, (_, token) => ({ token }))

$authStore.watch(authStoreLocalStorage)
