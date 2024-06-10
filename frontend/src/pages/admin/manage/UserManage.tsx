import { useState, useEffect } from 'react'
import axios from 'axios'
import NavbarAdmin from '@/components/NavbarAdmin'
import SidebarAdmin from '@/components/SidebarAdmin'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from '@/components/ui/table'

type User = {
	user_id: number
	user_name: string
	user_email: string
	user_address: string
	user_phone: string
}

export default function UserManage() {
	const [users, setUsers] = useState<User[]>([])
	const [userCount, setUserCount] = useState<number>(0)
	const [errorMessage, setErrorMessage] = useState<string>('')
	const BASE_API_URL: string | undefined = process.env.REACT_APP_API_URL
	const token: string | null = sessionStorage.getItem('token')

	useEffect(() => {
		async function fetchData(): Promise<void> {
			try {
				const response = await axios.get(`${BASE_API_URL}/get/getUsersAdmin`, {
					headers: {
						Authorization: `Bearer ${token}`
					}
				})
				
				setUsers(response.data.data)
				setUserCount(response.data.totalUsers)
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

		fetchData()
	}, [BASE_API_URL, token])

	return (
		<>
			<NavbarAdmin />
			<div className="flex">
				<section
					id="sidebar"
					className=""
				>
					<SidebarAdmin />
				</section>
				<section
					id="main-content"
					className="flex-grow lg:pl-60"
				>
					<div className="flex my-16 px-32 flex-col">
						<h1 className="text-2xl font-bold">Data Pelanggan</h1>
						<div className="mt-3">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className="w-[10px]">No</TableHead>
										<TableHead>Nama</TableHead>
										<TableHead>Email</TableHead>
										<TableHead>Telepon</TableHead>
										<TableHead>Alamat</TableHead>
										<TableHead className="text-right">Aksi</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{errorMessage && <p className="text-red-500">{errorMessage}</p>}
									{users.map((user, index) => (
										<TableRow key={user.user_id}>
											<TableCell className="font-medium">{index + 1}</TableCell>
											<TableCell>{user.user_name}</TableCell>
											<TableCell>{user.user_email}</TableCell>
											<TableCell>{user.user_phone}</TableCell>
											<TableCell>{user.user_address}</TableCell>
										</TableRow>
									))}
								</TableBody>
								<TableFooter>
									<TableRow>
										<TableCell colSpan={5}>Total</TableCell>
										<TableCell className="text-right">{userCount}</TableCell>
									</TableRow>
								</TableFooter>
							</Table>
						</div>
					</div>
				</section>
			</div>
		</>
	)
}
