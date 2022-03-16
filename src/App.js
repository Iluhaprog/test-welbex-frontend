import * as React from "react"
import "antd/dist/antd.css"
import "./App.css"
import { Routes, Route } from "react-router-dom"
import { SignUpPage } from "./pages/sign-up"
import { WallPage } from "./pages/wall"
import { RedactPostPage } from "./pages/redact-post"
import { SignInPage } from "./pages/sign-in/index"
import { Home } from "./pages/home"
import { Header } from "./feature/header"

function App () {
	return (
		<>
			<Header />
			<div>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/sign-in" element={<SignInPage />} />
					<Route path="/sign-up" element={<SignUpPage />} />
					<Route path="/wall" element={<WallPage />} />
					<Route path="/wall/:username" element={<WallPage />} />
					<Route path="/redact" element={<RedactPostPage />}/>
					<Route path="/redact/:forUpdate" element={<RedactPostPage />} />
				</Routes>
			</div>
		</>
	)
}

export default App
