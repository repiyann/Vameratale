import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBell, faSearch, faUser } from '@fortawesome/free-solid-svg-icons'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import logo from '/name_logo.png'
import { useAdminContext } from '@/utils/admin/authAdminProvider'

export default function NavbarAdmin() {
	const { handleLogout } = useAdminContext()
	const [shadow, setShadow] = useState<boolean>(false)

	useEffect(() => {
		function handleScroll(): void {
			const show: boolean = window.scrollY > 0
			shadow !== show && setShadow(show)
		}

		document.addEventListener('scroll', handleScroll)

		return () => {
			document.removeEventListener('scroll', handleScroll)
		}
	}, [shadow])

	return (
		<header className="flex px-6 py-3 md:px-16 md:py-2 lg:px-60 lg:py-4 bg-[#FDEBE7] sticky top-0 z-50 justify-between items-center shadow-xl">
			<Link
				to={'/admin/dashboard'}
				className="cursor-pointer"
			>
				<img
					src={logo}
					alt="Logo Vameratale"
					width={100}
				/>
			</Link>

			<nav>
				<ul className="hidden lg:flex lg:justify-between lg:items-center lg:relative lg:gap-5">
					<div className="relative">
						<input
							type="text"
							className="px-4 py-1 rounded-full w-[450px] border-4 border-[#D1D1D1] pl-10"
							placeholder="Cari katalog bunga"
						/>
						<FontAwesomeIcon
							icon={faSearch}
							className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400"
						/>
					</div>
				</ul>
			</nav>

			<div className="hidden lg:flex lg:justify-between lg:items-center lg:relative lg:gap-5 lg:ml-11">
				<Link
					to={''}
					className="fa-lg"
				>
					<FontAwesomeIcon icon={faBell} />
				</Link>
				<DropdownMenu>
					<DropdownMenuTrigger>
						<FontAwesomeIcon icon={faUser} />
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>
							<Link to={'/profile'}>Profile</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<a onClick={handleLogout}>Logout</a>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<div className="block lg:hidden">
				<Sheet>
					<SheetTrigger>
						<FontAwesomeIcon icon={faBars} />
					</SheetTrigger>
					<SheetContent className="w-[200px] sm:w-[300px]">
						<SheetHeader>
							<SheetTitle>Vameratale</SheetTitle>
							<SheetDescription>
								<div className="flex flex-col gap-3">
									<Link
										to={'/'}
										className="text-base"
									>
										Home
									</Link>
									<Link
										to={'/about'}
										className="text-base"
									>
										Tentang
									</Link>
									<Link
										to={'/contact'}
										className="text-base"
									>
										Kontak
									</Link>
									<hr />
									<Link
										to={'/profile'}
										className="text-base font-medium"
									>
										Profile
									</Link>
									<a
										onClick={handleLogout}
										className="text-base font-medium"
									>
										Logout
									</a>
								</div>
							</SheetDescription>
						</SheetHeader>
					</SheetContent>
				</Sheet>
			</div>
		</header>
	)
}
