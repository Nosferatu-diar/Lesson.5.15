import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Register = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
		termsAccepted: false,
	})

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [success, setSuccess] = useState(false)

	const handleChange = e => {
		const { name, value, type, checked } = e.target
		setFormData({
			...formData,
			[name]: type === 'checkbox' ? checked : value,
		})
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setError('')
		setSuccess(false)

		if (formData.password !== formData.confirmPassword) {
			setError('Passwords do not match!')
			return
		}

		if (!formData.termsAccepted) {
			setError('You must accept the terms and conditions.')
			return
		}

		setLoading(true)
		try {
			const response = await fetch(
				'https://67b7f9b22bddacfb271087b5.mockapi.io/Regist',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email: formData.email,
						password: formData.password,
					}),
				}
			)

			if (!response.ok) {
				throw new Error('Failed to register. Try again.')
			}

			setSuccess(true)
			setFormData({
				email: '',
				password: '',
				confirmPassword: '',
				termsAccepted: false,
			})
		} catch (error) {
			setError(error.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<section className='bg-gray-50 dark:bg-[#111111dc]'>
			<div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
				<div className='flex items-center justify-center text-center gap-2'>
					<NavLink className='text-2xl text-red-400 font-medium' to='/login'>
						Login
					</NavLink>
					<p className='text-white text-2xl'>|</p>
					<NavLink className='text-2xl text-blue-600 font-medium' to='/'>
						Register
					</NavLink>
				</div>
				<div className='w-full  rounded-lg shadow-xl dark:border !mt-3 md:mt-0 sm:max-w-md xl:p-0  dark:border-gray-700 bg-[#111111a2]'>
					<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
						<h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
							Create an account
						</h1>
						{error && <p className='text-red-500'>{error}</p>}
						{success && (
							<p className='text-green-500'>Registration successful!</p>
						)}
						<form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
							<div>
								<label
									htmlFor='email'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Your email
								</label>
								<input
									type='email'
									name='email'
									id='email'
									className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									placeholder='name@company.com'
									required
									value={formData.email}
									onChange={handleChange}
								/>
							</div>
							<div>
								<label
									htmlFor='password'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Password
								</label>
								<input
									type='password'
									name='password'
									id='password'
									placeholder='••••••••'
									className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									required
									value={formData.password}
									onChange={handleChange}
								/>
							</div>
							<div>
								<label
									htmlFor='confirmPassword'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Confirm password
								</label>
								<input
									type='password'
									name='confirmPassword'
									id='confirmPassword'
									placeholder='••••••••'
									className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									required
									value={formData.confirmPassword}
									onChange={handleChange}
								/>
							</div>
							<div className='flex items-start'>
								<div className='flex items-center h-5'>
									<input
										id='terms'
										name='termsAccepted'
										type='checkbox'
										className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
										checked={formData.termsAccepted}
										onChange={handleChange}
									/>
								</div>
								<div className='ml-3 text-sm'>
									<label
										htmlFor='terms'
										className='font-light text-gray-500 dark:text-gray-300'
									>
										I accept the
										<a
											className='font-medium text-primary-600 hover:underline dark:text-primary-500'
											href='#'
										>
											Terms and Conditions
										</a>
									</label>
								</div>
							</div>
							<button
								type='submit'
								className='w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
								disabled={loading}
							>
								{loading ? 'Creating...' : 'Create an account'}
							</button>
							<p className='text-sm font-light text-gray-500 dark:text-gray-400'>
								Already have an account?
								<NavLink
									className='font-medium text-primary-600 hover:underline dark:text-primary-500'
									to='/login'
								>
									Login here
								</NavLink>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Register
