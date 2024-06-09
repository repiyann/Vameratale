import { useAdminContext } from '@/utils/admin/authAdminProvider'
import { BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillGearFill } from 'react-icons/bs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function SidebarAdmin() {
	const { adminData } = useAdminContext()
	const location = useLocation()
	const [selectedValues, setSelectedValues] = useState<string[]>([''])
	const [activePage, setActivePage] = useState<string>('')

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
		const currentPage: string = location.pathname.substring(7) || 'dashboard'
		setActivePage(currentPage)

		const storedValues: string | null = sessionStorage.getItem('selectedValues')
		if (storedValues) {
			try {
				const parsedValues: string[] = JSON.parse(storedValues)
				setSelectedValues(parsedValues)
			} catch (error) {
				console.error('Error parsing stored selectedValues:', error)
			}
		}
	}, [location])

	function handleValueChange(newValues: string[]): void {
		setSelectedValues(newValues)
		sessionStorage.setItem('selectedValues', JSON.stringify(newValues))
	}

	return (
		<div className="md:block md:bg-[#FFFAFA] shadow-[rgba(0,0,0,0.13)_20px_0px_25px_-5px] md:w-80 p-10 md:h-screen md:fixed hidden">
			<h1 className="text-3xl font-bold">AdminDashboard</h1>
			<h1>{adminData?.email}</h1>
			<p className="text-sm mt-5">Menu</p>
			<Link
				to={'/admin/dashboard'}
				className={`${
					activePage === 'dashboard' ? 'text-[#A5273A]' : 'text-black'
				} text-lg font-semibold flex items-center mb-2`}
			>
				<BsGrid1X2Fill className="mr-3" />
				Dashboard
			</Link>
			<Accordion
				value={selectedValues}
				type="multiple"
				onValueChange={handleValueChange}
				className="space-y-2"
			>
				<AccordionItem value="item-1">
					<AccordionTrigger className="text-lg font-semibold">
						<div className={`${activePage === 'products' ? 'text-[#A5273A]' : 'text-black'} flex items-center`}>
							<BsFillArchiveFill className="mr-3" />
							Item Master
						</div>
					</AccordionTrigger>
					<AccordionContent className="flex flex-col ml-3">
						<Link to={'/admin/products/catalog'}>Tambah Barang</Link>
						<Link to={'/admin/products/category'}>Tambah Kategori</Link>
						<Link to={'/admin/products/varian'}>Tambah Varian</Link>
						<Link to={'/admin/products/size'}>Tambah Ukuran</Link>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-2">
					<AccordionTrigger className="text-lg font-semibold">
						<div className="flex items-center">
							<BsFillGrid3X3GapFill className="mr-3" />
							Orders & Deliveries
						</div>
					</AccordionTrigger>
					<AccordionContent className="flex flex-col ml-3">
						<div>Pengaturan Pengiriman</div>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-3">
					<AccordionTrigger className="text-lg font-semibold">
						<div className="flex items-center">
							<BsFillGearFill className="mr-3" />
							Reports
						</div>
					</AccordionTrigger>
					<AccordionContent className="flex flex-col ml-3">
						<Link to={'/admin/reports/stock'}>Data Stok Barang</Link>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-4">
					<AccordionTrigger className="text-lg font-semibold">
						<div className="flex items-center">
							<BsPeopleFill className="mr-3" />
							User Administrator
						</div>
					</AccordionTrigger>
					<AccordionContent className="flex flex-col ml-3">
						<Link to={'/admin/manage/admins'}>Manajemen Admin</Link>
						<Link to={'/admin/manage/users'}>Manajemen User</Link>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	)
}
