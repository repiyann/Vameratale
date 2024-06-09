import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import roundLogo from '/round_logo.png'

interface VerifyResponse {
	email: string
}

export default function Verifying() {
	const [pins, setPins] = useState<string[]>(['', '', '', ''])
	const [errorMessage, setErrorMessage] = useState<string>('')
	const [resendDisabled, setResendDisabled] = useState<boolean>(false)
	const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(4).fill(null))
	const [timer, setTimer] = useState<number>(600)
	const navigate = useNavigate()
	const BASE_API_URL: string | undefined = process.env.REACT_APP_API_URL

	useEffect(() => {
		const interval = setInterval(() => {
			setTimer((prevTimer) => prevTimer - 1)
		}, 1000)

		return () => clearInterval(interval)
	}, [])

	useEffect(() => {
		if (timer <= 0) {
			setResendDisabled(false)
		}
	}, [timer])

	async function generateOTP(email: string): Promise<void> {
		try {
			await axios.post<VerifyResponse>(`${BASE_API_URL}/auth/generateOTP`, { email })
			setErrorMessage('Kode OTP baru berhasil dikirim')
			setResendDisabled(true)
			setTimer(600)
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

	function handleChange(index: number, value: string): void {
		if (value.length > 1) return
		const newPins: string[] = [...pins]
		newPins[index] = value
		setPins(newPins)
		if (value !== '' && index < 3) {
			inputRefs.current[index + 1]?.focus()
		} else if (value === '' && index > 0) {
			inputRefs.current[index - 1]?.focus()
		}
	}

	function handleSubmit(): void {
		const pinString: string = pins.join('')
		sessionStorage.setItem('verificationPin', pinString)
		navigate('/reset')
	}

	function handleResendCode(): void {
		const email: string | null = sessionStorage.getItem('resetEmail')
		if (email) {
			generateOTP(email)
		} else {
			setErrorMessage('Email tidak ditemukan')
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
				<h1 className="text-xl flex justify-center font-bold leading-tight mt-72 md:mt-64 mb-6 md:text-5xl">
					Verify your email
				</h1>
				<h2 className="text-lg flex justify-center font-semibold">Enter the 4 digit code from your email</h2>

				<form
					className="mt-10"
					method="POST"
					onSubmit={(e) => {
						e.preventDefault()
						handleSubmit()
					}}
				>
					<div className="flex justify-between gap-5">
						{errorMessage && <p className="text-red-500">{errorMessage}</p>}
						{pins.map((pin, index) => (
							<input
								key={index}
								type="text"
								placeholder="-"
								maxLength={1}
								className="w-1/4 px-4 py-4 text-xl rounded-xl bg-white mt-1 border focus:outline-none text-center focus:ring-2 focus:ring-[#E28392]"
								autoFocus={index === 0}
								value={pin}
								ref={(el) => (inputRefs.current[index] = el)}
								onChange={(e) => handleChange(index, e.target.value)}
							/>
						))}
					</div>
					<button
						type="submit"
						className="w-full flex items-center justify-center bg-[#ff7474] hover:bg-[#ff5d5d] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 text-white font-semibold rounded-[28px] px-4 py-3 mt-4 border-white border-4"
					>
						Verifikasi Kode
					</button>
				</form>

				<div className="mt-12 items-center text-xl flex justify-center">
					<button
						onClick={handleResendCode}
						disabled={resendDisabled || timer > 0}
						className="text-blue-700 ml-1 text-xl hover:text-blue-900 font-semibold underline"
					>
						Resend Code {timer > 0 && `(${Math.floor(timer / 60)}:${timer % 60 < 10 ? '0' : ''}${timer % 60})`}
					</button>
				</div>
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
