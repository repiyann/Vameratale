import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

type UserData = {
	email: string
	name: string
	telepon: string
	address: string
	role_id: number
}

interface UserContextProps {
	userData: UserData | null
	errorMessage: string
	handleLogout: () => void
}

export const UserContext = createContext<UserContextProps | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
	const [userData, setUserData] = useState<UserData | null>(null)
	const [errorMessage, setErrorMessage] = useState<string>('')
	const navigate = useNavigate()
	const token = localStorage.getItem('token')

	useEffect(() => {
		if (token) {
			const fetchUser = async () => {
				try {
					const BASE_API_URL = process.env.REACT_APP_API_URL
					const response = await axios.get(`${BASE_API_URL}/auth/getUser`, {
						headers: {
							Authorization: `Bearer ${token}`
						}
					})
					const { user } = response.data
					setUserData(user)
				} catch (error) {
					setErrorMessage('Fetching user data failed. Please try again.')
				}
			}
			fetchUser()
		} else {
			setUserData(null)
		}
	}, [token])

	function handleLogout(): void {
		localStorage.removeItem('token')
		localStorage.removeItem('userRole')
		setUserData(null)
		navigate('/')
	}

	return <UserContext.Provider value={{ userData, errorMessage, handleLogout }}>{children}</UserContext.Provider>
}
