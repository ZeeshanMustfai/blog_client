import Login from './components/Login'
import Signup from './components/Signup'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './routes/ProtectedRoute'
import Home from './components/Home'
import { useSelector } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { TAuthReducer } from './types'
import CreatePost from './components/CreatePost'
import Nav from './components/Nav'
import PostDetail from './components/PostDetail'

function App() {
	const { user, isSuccess } = useSelector((state: TAuthReducer) => state.auth)

	return (
		<BrowserRouter>
			{user && <Nav />}
			<Routes>
				<Route element={<ProtectedRoute isAuthenticated={user} />}>
					<Route path='/' index element={<Home />} />
					<Route path='/create-post' element={<CreatePost />} />
					<Route path='/create-post/:id' element={<CreatePost />} />
					<Route path='/detail-post/:id' element={<PostDetail />} />
				</Route>
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<Signup />} />
			</Routes>
			<Toaster />
		</BrowserRouter>
	)
}

export default App
