import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import roundLogo from '/round_logo.png'

export default function Register() {
	const [telepon, setTelepon] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [confirmPassword, setConfirmPassword] = useState<string>('')
	const [errorMessage, setErrorMessage] = useState<string>('')
	const BASE_API_URL: string | undefined = process.env.REACT_APP_API_URL
	const navigate = useNavigate()

	function handleValidation(): boolean {
		let isValid: boolean = true
		setErrorMessage('')

		if (!email.trim()) {
			isValid = false
			setErrorMessage('Email is required')
		} else if (!/^\S+@\S+$/i.test(email)) {
			isValid = false
			setErrorMessage('Invalid email format')
		}

		if (password.length < 8) {
			isValid = false
			setErrorMessage('Password must be at least 8 characters long')
		} else if (password !== confirmPassword) {
			isValid = false
			setErrorMessage('Passwords do not match')
		}

		if (!/^\d+$/.test(telepon)) {
			isValid = false
			setErrorMessage('Invalid phone number format')
		}

		return isValid
	}

	async function handleRegister(): Promise<void> {
		if (!handleValidation()) {
			return
		}

		const data = {
			email,
			telepon,
			password,
			confirmPassword
		}

		try {
			await axios.post(`${BASE_API_URL}/auth/register`, data)
			navigate('/login')
		} catch (error) {
			setErrorMessage('Registration failed. Please try again.')
		}
	}

	return (
		<section className="flex flex-col h-screen items-center md:grid md:grid-cols-2 bg-white">
			<div
				className="col-start-1 col-end-1 items-center justify-center bg-[#F4ACB7] px-6 lg:px-72 lg:py-20"
				style={{
					backgroundImage: 'url(/Frame.png)',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
					width: '100%',
					height: '100%',
					zoom: '72%'
				}}
			>
				<h1 className="text-xl font-bold leading-tight mt-32 md:mt-12 md:text-5xl">Welcome,</h1>

				<form
					className="mt-10"
					onSubmit={(e) => {
						e.preventDefault()
						handleRegister()
					}}
				>
					<div>
						{errorMessage && <p className="text-red-500">{errorMessage}</p>}
						<label className="font-semibold text-xl"> Email Address </label>
						<input
							type="email"
							placeholder="Enter Email Address"
							className="w-full px-4 py-4 text-xl rounded-xl bg-white mt-1 border focus:outline-none focus:ring-2 focus:ring-[#E28392]"
							autoFocus
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="mt-4">
						<label className="font-semibold text-xl"> No Telepon </label>
						<input
							type="tel"
							placeholder="Enter No Telepon"
							className="w-full px-4 py-4 text-xl rounded-xl bg-white mt-1 border focus:outline-none focus:ring-2 focus:ring-[#E28392]"
							required
							value={telepon}
							onChange={(e) => setTelepon(e.target.value)}
						/>
					</div>
					<div className="mt-4">
						<label className="font-semibold text-xl"> Password </label>
						<input
							type="password"
							placeholder="Enter Password"
							minLength={8}
							className="w-full px-4 py-4 text-xl rounded-xl bg-white mt-1 border focus:outline-none focus:ring-2 focus:ring-[#E28392]"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="mt-4">
						<label className="font-semibold text-xl"> Confirm Password </label>
						<input
							type="password"
							placeholder="Enter Confirm Password"
							minLength={8}
							className="w-full px-4 py-4 text-xl rounded-xl bg-white mt-1 border focus:outline-none focus:ring-2 focus:ring-[#E28392]"
							required
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</div>
					<button
						type="submit"
						className="w-full flex items-center justify-center bg-[#ff7474] hover:bg-[#ff5d5d] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 text-white font-semibold rounded-[28px] px-4 py-3 mt-6 border-white border-4"
					>
						Sign In
					</button>
				</form>

				<div className="my-6 flex items-center space-x-10">
					<hr className="flex-grow border-white" />
					<span className="text-xl">Atau Masuk Dengan</span>
					<hr className="flex-grow border-white" />
				</div>
				<div className="flex justify-center gap-5 mb-7">
					<FontAwesomeIcon
						icon={faFacebook}
						size="2xl"
					/>
					<FontAwesomeIcon
						icon={faGoogle}
						size="2xl"
					/>
				</div>
				<div className="mt-2 items-center text-xl flex justify-center">
					Don't have an account?
					<Link
						to={'/login'}
						className="text-blue-700 ml-1 text-xl hover:text-blue-900 font-semibold underline"
					>
						Log In
					</Link>
				</div>
			</div>
			<div className="col-start-2 col-end-2 bg-white hidden md:flex md:justify-center">
				<img
					src={roundLogo}
					width={500}
				/>
			</div>
			<nav className="absolute top-0 left-0 right-0 p-4 flex justify-between w-full">
				<Link
					to={'/'}
					className="text-white bg-[#ff7474] hover:bg-[#ff5d5d] px-4 py-2 rounded-2xl"
				>
					Back
				</Link>
			</nav>
		</section>
	)
}
