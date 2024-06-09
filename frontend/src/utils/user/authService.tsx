import axios from 'axios'
import { createContext, useState, useEffect, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

type UserData = {
	email: string
	name: string
	telepon: string
	address: string
	role_id: number
}

interface UserResponse {
	user: UserData
}

interface UserContextProps {
	userData: UserData | null
	errorMessage: string
	handleLogout: () => void
}

export const UserContext = createContext<UserContextProps | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
	const [userData, setUserData] = useState<UserData | null>(null)
	const [errorMessage, setErrorMessage] = useState<string>('')
	const navigate = useNavigate()
	const token: string | null = sessionStorage.getItem('token')

	useEffect(() => {
		async function fetchUser(): Promise<void> {
			if (token) {
				try {
					const BASE_API_URL: string | undefined = process.env.REACT_APP_API_URL
					if (!BASE_API_URL) {
						throw new Error('API URL is not defined')
					}

					const response = await axios.get<UserResponse>(`${BASE_API_URL}/auth/getUser`, {
						headers: {
							Authorization: `Bearer ${token}`
						}
					})

					const { user } = response.data
					setUserData(user)
				} catch (error: unknown) {
					if (axios.isAxiosError(error)) {
						setErrorMessage(error.response?.data.message)
					} else if (error instanceof Error) {
						setErrorMessage(error.message)
					} else {
						setErrorMessage('Server bermasalah')
					}
				}
			} else {
				setUserData(null)
			}
		}

		fetchUser()
	}, [token])

	function handleLogout(): void {
		sessionStorage.removeItem('token')
		sessionStorage.removeItem('userRole')
		sessionStorage.removeItem('selectedValues')
		setUserData(null)
		navigate('/')
	}

	return <UserContext.Provider value={{ userData, errorMessage, handleLogout }}>{children}</UserContext.Provider>
}
