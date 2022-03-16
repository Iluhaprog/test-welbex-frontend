
import { createEffect, createEvent, createStore, sample } from "effector"
import env from "react-dotenv"

const setData = createEvent("set-data")
export const removePost = createEvent("remove-post")
export const getPostsEvent = createEffect("get-posts-event")

export const getPosts = createEffect(async ({ username, page, limit, ...rest }) => {
	const res = await fetch(`${env.API_URL}/posts/${username}/${page}/${limit}`)
	return res.json()
})

export const $postsStore = createStore({
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
