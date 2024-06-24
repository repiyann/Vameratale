import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from '@/components/ui/table'
import NavbarAdmin from '@/components/NavbarAdmin'
import SidebarAdmin from '@/components/SidebarAdmin'

type Admin = {
	admin_id: number
	admin_email: string
}

export default function AdminManage() {
	const [admins, setAdmins] = useState<Admin[]>([])
	const [adminCount, setAdminCount] = useState<number>(0)
	const [errorMessage, setErrorMessage] = useState<string>('')
	const BASE_API_URL: string | undefined = process.env.REACT_APP_API_URL
	const token: string | null = sessionStorage.getItem('token')

	function handleAxiosError(error: unknown): void {
		if (axios.isAxiosError(error)) {
			setErrorMessage(error.response?.data.message)
		} else if (error instanceof Error) {
			setErrorMessage(error.message)
		} else {
			setErrorMessage('Server bermasalah')
		}
	}

	useEffect(() => {
		async function fetchData(): Promise<void> {
			try {
				const response = await axios.get(`${BASE_API_URL}/get/getAdmins`, {
					headers: {
						Authorization: `Bearer ${token}`
					}
				})

				setAdmins(response.data.data)
				setAdminCount(response.data.totalUsers)
			} catch (error: unknown) {
				handleAxiosError(error)
			}
		}

		fetchData()
	}, [BASE_API_URL, token])

	async function handleDelete(id: number): Promise<void> {
		try {
			await axios.delete(`${BASE_API_URL}/get/deleteAdmin/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})

			setAdmins(admins.filter((admin) => admin.admin_id !== id))
		} catch (error: unknown) {
			handleAxiosError(error)
		}
	}

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
						<h1 className="text-2xl font-bold">Data Admin</h1>
						<div className="mt-4">
							<Link
								to={'/admin/manage/admins/add-admin'}
								className="px-4 pb-2 pt-1 bg-[#FAEAED] font-semibold rounded-xl border-[3px] border-[#D85A6D]"
							>
								<FontAwesomeIcon
									icon={faPlusSquare}
									size="xl"
									className="text-[#606F49] mr-2"
								/>
								Tambah Admin
							</Link>
						</div>
						<div className="mt-7">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className="w-[10px]">No</TableHead>
										<TableHead>Admin Email</TableHead>
										<TableHead className="text-right">Aksi</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{errorMessage && <p className="text-red-500">{errorMessage}</p>}
									{admins.map((admin, index) => (
										<TableRow key={admin.admin_id}>
											<TableCell className="font-medium">{index + 1}</TableCell>
											<TableCell>{admin.admin_email}</TableCell>
											<TableCell className="text-right">
												<FontAwesomeIcon
													icon={faTrashCan}
													size="xl"
													color="red"
													onClick={() => handleDelete(admin.admin_id)}
												/>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
								<TableFooter>
									<TableRow>
										<TableCell colSpan={5}>Total</TableCell>
										<TableCell className="text-right">{adminCount}</TableCell>
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
