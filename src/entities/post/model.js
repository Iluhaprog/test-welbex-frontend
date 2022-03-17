
import { createEffect, createEvent, createStore, sample } from "effector"

const setData = createEvent("set-data")
export const selectPost = createEvent("select-post")
export const cleanSelectedPost = createEvent("clean-selected-post")
export const removePost = createEvent("remove-post")
export const getPostsEvent = createEffect("get-posts-event")

export const getPosts = createEffect(async ({ username, page, limit, ...rest }) => {
	const res = await fetch(`${process.env.REACT_APP_API_URL}/posts/${username}/${page}/${limit}`)
	return res.json()
})

export const $postsStore = createStore({
	selected: {},
	username: "",
	elements: [],
	page: 1,
	limit: 20,
	count: 0
})
	.on(setData, (_, data) => data)
	.on(removePost, (store, postId) => ({
		...store,
		elements: store.elements.filter(({ id }) => postId !== id)
	}))
	.on(getPostsEvent, (store, { username }) => ({ ...store, username }))
	.on(selectPost, (store, { id }) => {
		return ({
			...store,
			selected: store.elements.find((el) => el.id === id)
		})
	})
	.on(cleanSelectedPost, (store) => ({
		...store,
		selected: {}
	}))

sample({
	clock: getPostsEvent,
	source: $postsStore,
	fn: (data) => data,
	target: getPosts
})

getPosts.done.watch(({ params, result }) => {
	const { posts, count } = result

	setData({
		count,
		elements: [ ...params.elements, ...posts ],
		page: params.page + 1,
		limit: params.limit
	})
})
