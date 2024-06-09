import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import roundLogo from '/round_logo.png'

interface ResetResponse {
	email: string
	password: string
	confirmPassword: string
	otp: string
}

export default function Reset() {
	const [password, setPassword] = useState<string>('')
	const [confirmPassword, setConfirmPassword] = useState<string>('')
	const [errorMessage, setErrorMessage] = useState<string>('')
	const navigate = useNavigate()
	const BASE_API_URL: string | undefined = process.env.REACT_APP_API_URL

	async function handleSubmit(): Promise<void> {
		const resetEmail: string | null = sessionStorage.getItem('resetEmail')
		const verificationPin: string | null = sessionStorage.getItem('verificationPin')

		if (password !== confirmPassword) {
			return setErrorMessage('Kata sandi tidak sesuai')
		}

		try {
			await axios.post<ResetResponse>(`${BASE_API_URL}/auth/resetPasswordOTP`, {
				email: resetEmail,
				otp: verificationPin,
				password: password,
				confirmPassword: confirmPassword
			})
			sessionStorage.removeItem('resetEmail')
			sessionStorage.removeItem('verificationPin')
			navigate('/login')
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
				<h1 className="text-xl font-bold leading-tight mt-72 md:mt-56 mb-6 md:text-5xl">Create New Password</h1>

				<form
					className="mt-10"
					method="POST"
					onSubmit={(e) => {
						e.preventDefault()
						handleSubmit()
					}}
				>
					<div className="mt-4">
						{errorMessage && <p className="text-red-500">{errorMessage}</p>}
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
					<div className="mt-4">
						<label className="font-semibold text-xl"> Confirm Password </label>
						<input
							type="password"
							placeholder="Enter Confirm Password"
							minLength={8}
							className="w-full px-4 py-4 text-xl rounded-xl bg-white mt-1 border focus:outline-none focus:ring-2 focus:ring-[#E28392]"
							autoFocus
							required
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</div>
					<button
						type="submit"
						className="w-full flex items-center justify-center bg-[#ff7474] hover:bg-[#ff5d5d] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 text-white font-semibold rounded-[28px] px-4 py-3 mt-4 border-white border-4"
					>
						Reset Password
					</button>
				</form>
			</div>
			<div className="col-start-2 col-end-2 bg-white hidden md:flex md:justify-center">
				<img
					src={roundLogo}
					width={500}
				/>
			</div>
		</section>
	)
}
