import axios from 'axios'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

interface VerifyEmailResponse {
	email: string
	token: string
	message: string
}

export default function VerifyEmail() {
	const [searchParams] = useSearchParams()
	const token: string | null = searchParams.get('token')
	const email: string | null = searchParams.get('email')

	useEffect(() => {
		async function verifyEmail(): Promise<void> {
			try {
				const BASE_API_URL: string | undefined = process.env.REACT_APP_API_URL
				if (!BASE_API_URL) {
					throw new Error('API URL is not defined')
				}

				const response = await axios.post<VerifyEmailResponse>(`${BASE_API_URL}/auth/verifyEmail`, { email, token })
				alert(response.data.message)
			} catch (error) {
				alert(error)
			}
		}

		if (token && email) {
			verifyEmail()
		}
	}, [token, email])

	return (
		<div>
			<h2>Email Verification</h2>
			<p>Verifying your email...</p>
		</div>
	)
}
