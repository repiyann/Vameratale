import axios from 'axios'
import { createContext, useState, useEffect, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

type AdminData = {
	email: string
	name: string
	role_id: number
}

interface AdminResponse {
	admin: AdminData
}

interface AdminContextProps {
	adminData: AdminData | null
	errorMessage: string
	handleLogout: () => void
}

export const AdminContext = createContext<AdminContextProps | undefined>(undefined)

export function AdminProvider({ children }: { children: ReactNode }) {
	const [adminData, setAdminData] = useState<AdminData | null>(null)
	const [errorMessage, setErrorMessage] = useState<string>('')
	const navigate = useNavigate()
	const token: string | null = localStorage.getItem('token')

	useEffect(() => {
		const fetchAdmin = async (): Promise<void> => {
			if (token) {
				try {
					const BASE_API_URL: string | undefined = process.env.REACT_APP_API_URL
					if (!BASE_API_URL) {
						throw new Error('API URL is not defined')
					}

					const response = await axios.get<AdminResponse>(`${BASE_API_URL}/auth/getAdmin`, {
						headers: {
							Authorization: `Bearer ${token}`
						}
					})

					const { admin } = response.data
					setAdminData(admin)
				} catch (error) {
					setErrorMessage('Fetching user data failed. Please try again.')
				}
			} else {
				setAdminData(null)
			}
		}

		fetchAdmin()
	}, [token])

	function handleLogout(): void {
		localStorage.removeItem('token')
		localStorage.removeItem('userRole')
		localStorage.removeItem('selectedValues')
		setAdminData(null)
		navigate('/')
	}

	return <AdminContext.Provider value={{ adminData, errorMessage, handleLogout }}>{children}</AdminContext.Provider>
}
