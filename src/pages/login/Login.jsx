import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})

	const [changePassword, setChangePassword] = useState({
		currentPassword: '',
		newPassword: '',
		confirmPassword: '',
	})

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')
	const [isChangingPassword, setIsChangingPassword] = useState(false)

	const navigate = useNavigate()

	const handleChange = e => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const handlePasswordChange = e => {
		const { name, value } = e.target
		setChangePassword({ ...changePassword, [name]: value })
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setError('')
		setLoading(true)

		try {
			const response = await fetch(
				'https://67b7f9b22bddacfb271087b5.mockapi.io/Regist'
			)
			const users = await response.json()

			const user = users.find(
				user =>
					user.email === formData.email && user.password === formData.password
			)

			if (!user) {
				throw new Error('Invalid email or password')
			}

			localStorage.setItem('user', JSON.stringify(user))

			navigate('/home')
		} catch (error) {
			setError(error.message)
		} finally {
			setLoading(false)
		}
	}

	const handlePasswordUpdate = async e => {
		e.preventDefault()
		setError('')
		setSuccess('')

		const storedUser = JSON.parse(localStorage.getItem('user'))

		if (!storedUser || storedUser.password !== changePassword.currentPassword) {
			setError('Current password is incorrect.')
			return
		}
		if (changePassword.newPassword !== changePassword.confirmPassword) {
			setError('New passwords do not match.')
			return
		}
		try {
			await fetch(
				`https://67b7f9b22bddacfb271087b5.mockapi.io/Regist${storedUser.id}`,
				{
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ password: changePassword.newPassword }),
				}
			)

			setSuccess('Password updated successfully!')
			localStorage.setItem(
				'user',
				JSON.stringify({ ...storedUser, password: changePassword.newPassword })
			)
			setChangePassword({
				currentPassword: '',
				newPassword: '',
				confirmPassword: '',
			})

			// Redirect to login page after successful password change
			setTimeout(() => {
				navigate('/login')
			}, 1000) // Added delay for success message visibility
			// eslint-disable-next-line no-unused-vars
		} catch (error) {
			setError('Failed to update password.')
		}
	}

	return (
		<div className='bg-cover bg-center bg-fixed bg-black'>
			<div className='h-screen flex justify-center items-center'>
				<div className='bg-white !mx-4 !p-8 rounded shadow-md w-full md:w-1/2 lg:w-1/3'>
					<h1 className='text-3xl font-bold !mb-8 text-center'>
						{isChangingPassword ? 'Change Password' : 'Login'}
					</h1>
					{error && <p className='text-red-700 text-center'>{error}</p>}
					{success && <p className='text-green-600 text-center'>{success}</p>}

					{!isChangingPassword ? (
						<form onSubmit={handleSubmit}>
							<div className='!mb-4'>
								<label
									className='block font-semibold text-gray-700 !mb-2'
									htmlFor='email'
								>
									Email Address
								</label>
								<input
									className='border rounded w-full !py-2 !px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									id='email'
									type='email'
									name='email'
									placeholder='Enter your email address'
									required
									value={formData.email}
									onChange={handleChange}
								/>
							</div>
							<div className='!mb-4'>
								<label
									className='block font-semibold text-gray-700 !mb-2'
									htmlFor='password'
								>
									Password
								</label>
								<input
									className='border rounded w-full !py-2 !px-3 text-gray-700 !mb-3 leading-tight focus:outline-none focus:shadow-outline'
									id='password'
									type='password'
									name='password'
									placeholder='Enter your password'
									required
									value={formData.password}
									onChange={handleChange}
								/>
								<a
									className='text-gray-600 hover:text-gray-800 cursor-pointer'
									onClick={() => setIsChangingPassword(true)}
								>
									Change password?
								</a>
							</div>
							<div className='!mb-6'>
								<button
									className='bg-blue-500 hover:bg-blue-700 text-white font-bold !py-2 flex items-center justify-center mx-auto w-[150px] !px-3 !text-center rounded focus:outline-none focus:shadow-outline'
									type='submit'
									disabled={loading}
								>
									{loading ? 'Logging in...' : 'Login'}
								</button>
							</div>
						</form>
					) : (
						<form onSubmit={handlePasswordUpdate}>
							<div className='!mb-4'>
								<label
									className='block font-semibold text-gray-700 !mb-2'
									htmlFor='currentPassword'
								>
									Current Password
								</label>
								<input
									className='border rounded w-full !py-2 !px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									id='currentPassword'
									type='password'
									name='currentPassword'
									placeholder='Enter your current password'
									required
									value={changePassword.currentPassword}
									onChange={handlePasswordChange}
								/>
							</div>
							<div className='!mb-4'>
								<label
									className='block font-semibold text-gray-700 !mb-2'
									htmlFor='newPassword'
								>
									New Password
								</label>
								<input
									className='border rounded w-full !py-2 !px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									id='newPassword'
									type='password'
									name='newPassword'
									placeholder='Enter new password'
									required
									value={changePassword.newPassword}
									onChange={handlePasswordChange}
								/>
							</div>
							<div className='!mb-4'>
								<label
									className='block font-semibold text-gray-700 !mb-2'
									htmlFor='confirmPassword'
								>
									Confirm New Password
								</label>
								<input
									className='border rounded w-full !py-2 !px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									id='confirmPassword'
									type='password'
									name='confirmPassword'
									placeholder='Confirm new password'
									required
									value={changePassword.confirmPassword}
									onChange={handlePasswordChange}
								/>
							</div>
							<div className='!mb-6'>
								<button
									className='bg-gray-500 hover:bg-gray-700 cursor-pointer text-white font-bold !py-2 flex items-center justify-center mx-auto w-[200px] !px-3 !text-center rounded focus:outline-none focus:shadow-outline'
									type='submit'
								>
									Change Password
								</button>
							</div>
							<a
								className='text-gray-600 hover:text-gray-800 cursor-pointer'
								onClick={() => setIsChangingPassword(false)}
							>
								Back to Login
							</a>
						</form>
					)}
				</div>
			</div>
		</div>
	)
}

export default Login
