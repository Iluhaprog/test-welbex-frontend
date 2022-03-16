import * as React from "react"
import { useForm } from "react-hook-form"

export function AuthForm () {
	const { register, handleSubmit, formState: { errors } } = useForm()

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input
				{
					...register("username")
				}
			/>
			<input
				{
					...register(
						"password",
						{ required: true }
					)
				}
			/>
			{errors.exampleRequired && <span>This field is required</span>}
			<input type="submit" />
		</form>
	)
}

function onSubmit (values) {
	console.log(values)
}
