import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

type AdminData = {
	email: string
	name: string
	telepon: string
	address: string
	role_id: number
}

interface AdminContextProps {
	adminData: AdminData | null
	errorMessage: string
	handleLogout: () => void
}

export const AdminContext = createContext<AdminContextProps | undefined>(undefined)

export function AdminProvider({ children }: { children: React.ReactNode }) {
	const [adminData, setAdminData] = useState<AdminData | null>(null)
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
					setAdminData(user)
				} catch (error) {
					setErrorMessage('Fetching user data failed. Please try again.')
				}
			}
			fetchUser()
		} else {
			setAdminData(null)
		}
	}, [token])

	function handleLogout(): void {
		localStorage.removeItem('token')
		localStorage.removeItem('userRole')
		setAdminData(null)
		navigate('/')
	}

	return <AdminContext.Provider value={{ adminData, errorMessage, handleLogout }}>{children}</AdminContext.Provider>
}
