import MainLayout from '../components/main-layout/index.jsx'
import { Routes, Route } from 'react-router-dom'
import Register from '../pages/register/Register'
import Login from '../pages/login/Login'
import Home from '../pages/home/Home'

const RouterComponent = () => {
	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route index element={<Register />} />
				<Route path='home' element={<Home />} />
				<Route path='login' element={<Login />} />
			</Route>
		</Routes>
	)
}

export default RouterComponent
