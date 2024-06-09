import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import roundLogo from '/round_logo.png'

interface LoginAdminResponse {
	token: string
	role: string
}

export default function LoginAdmin() {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [errorMessage, setErrorMessage] = useState<string>('')
	const navigate = useNavigate()
	const BASE_API_URL: string | undefined = process.env.REACT_APP_API_URL

	function handleValidation(): boolean {
		let isValid: boolean = true
		setErrorMessage('')

		if (!email.trim()) {
			isValid = false
			setErrorMessage('Email tidak boleh kosong')
		} else if (!/^\S+@\S+$/i.test(email)) {
			isValid = false
			setErrorMessage('Format email salah')
		}

		if (password.length < 8) {
			isValid = false
			setErrorMessage('Kata sandi minimal 8 karakter')
		}

		return isValid
	}

	async function handleLogin(): Promise<void> {
		if (!handleValidation()) {
			return
		}

		const data = {
			email,
			password
		}

		try {
			const response = await axios.post<LoginAdminResponse>(`${BASE_API_URL}/auth/loginAdmin`, data)
			const { token, role } = response.data
			sessionStorage.setItem('token', token)
			sessionStorage.setItem('userRole', role)
			sessionStorage.removeItem('selectedValues')
			navigate('/admin/dashboard')
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				setErrorMessage(error.response?.data.message)
			} else if (error instanceof Error) {
				setErrorMessage(error.message)
			} else {
				setErrorMessage('Server bermasalah')
			}
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
				<h1 className="text-xl font-bold leading-tight mt-48 md:mt-60 md:text-5xl">Welcome Admin,</h1>

				<form
					className="mt-10"
					onSubmit={(e) => {
						e.preventDefault()
						handleLogin()
					}}
				>
					<div>
						{errorMessage && <p className="text-red-500">{errorMessage}</p>}
						<label className="font-semibold text-xl"> Email Address </label>
						<input
							type="text"
							placeholder="Enter Email Address"
							className="w-full px-4 py-4 text-xl rounded-xl bg-white mt-1 border focus:outline-none focus:ring-2 focus:ring-[#E28392]"
							autoFocus
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="mt-4">
						<label className="font-semibold text-xl"> Password </label>
						<input
							type="password"
							placeholder="Enter Password"
							minLength={8}
							className="w-full px-4 py-4 text-xl rounded-xl bg-white mt-1 border focus:outline-none focus:ring-2 focus:ring-[#E28392]"
							autoFocus
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<Link
						to={'/forgot'}
						className="mt-4 flex text-lg justify-end text-blue-700 hover:text-blue-900 underline"
					>
						Lupa Password?
					</Link>
					<button
						type="submit"
						className="w-full flex items-center justify-center bg-[#ff7474] hover:bg-[#ff5d5d] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 text-white font-semibold rounded-[28px] px-4 py-3 mt-4 border-white border-4"
					>
						Log In
					</button>
				</form>
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
