import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faBars, faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons'
import { useUserContext } from '@/utils/user/authProvider'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuSub,
	DropdownMenuSubTrigger,
	DropdownMenuSubContent,
	DropdownMenuPortal
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import logo from '/name_logo.png'

export default function Navbar() {
	const [openDropdown, setOpenDropdown] = useState<boolean>(false)
	const [shadow, setShadow] = useState<boolean>(false)
	const [activeSection, setActiveSection] = useState<string>('')
	const location = useLocation()
	const navigate = useNavigate()
	const { userData, handleLogout } = useUserContext()
	const isDashboard: boolean = location.pathname === '/dashboard'
	const isAbout: boolean = location.pathname === '/about'

	function scrollToHome(): void {
		!isDashboard
			? (navigate('/'),
			setTimeout(() => {
					window.scrollTo({ top: 0, behavior: 'smooth' })
			}, 100))
			: window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	useEffect(() => {
		function handleScroll(): void {
			const show: boolean = window.scrollY > 0
			shadow !== show && setShadow(show)
			const sections: NodeListOf<HTMLElement> = document.querySelectorAll('section')
			let currentSection: string = ''

			sections.forEach((section) => {
				const sectionTop: number = section.offsetTop
				const sectionHeight: number = section.clientHeight
				if (window.scrollY >= sectionTop - sectionHeight / 3) {
					currentSection = section.id
				}
			})

			setActiveSection(currentSection)
		}

		document.addEventListener('scroll', handleScroll)

		return () => {
			document.removeEventListener('scroll', handleScroll)
		}
	}, [shadow, location])

	function scrollToContact(): void {
		isDashboard || isAbout
			? (navigate('/'),
			setTimeout(() => {
					const contactSection = document.getElementById('contact')
					contactSection && contactSection.scrollIntoView({ behavior: 'smooth' })
			}, 100))
			: (() => {
					const contactSection = document.getElementById('contact')
					contactSection && contactSection.scrollIntoView({ behavior: 'smooth' })
			})()
	}

	function scrollToAbout(): void {
		!isAbout &&
			(navigate('/about'),
			setTimeout(() => {
				window.scrollTo({ top: 0, behavior: 'smooth' })
			}, 100))
	}

	return (
		<header
			className={`px-6 py-5 md:px-20 md:py-4 lg:px-60 lg:py-4 bg-[#FDEBE7] flex sticky top-0 z-50 justify-between items-center ${
				shadow && 'shadow-lg'
			}`}
		>
			{(!userData && isDashboard) || isAbout ? (
				<Link
					to={'/'}
					className="cursor-pointer"
				>
					<img
						src={logo}
						alt="Logo Vameratale"
						width={100}
					/>
				</Link>
			) : (
				<a
					onClick={scrollToHome}
					className="cursor-pointer"
				>
					<img
						src={logo}
						alt="Logo Vameratale"
						width={100}
					/>
				</a>
			)}

			<nav>
				<ul className="hidden lg:flex lg:justify-between lg:items-center lg:relative lg:gap-10">
					<li>
						{isDashboard || isAbout ? (
							<Link
								to={'/'}
								className="font-medium cursor-pointer"
							>
								Beranda
							</Link>
						) : (
							<a
								className={`font-medium cursor-pointer ${
									activeSection === 'home' && 'pb-1 border-b-4 border-green-950'
								}`}
								onClick={scrollToHome}
							>
								Beranda
							</a>
						)}
					</li>
					<li>
						<DropdownMenu
							open={openDropdown}
							onOpenChange={() => setOpenDropdown(false)}
						>
							<DropdownMenuTrigger
								onMouseEnter={() => setOpenDropdown(true)}
								className={`font-medium ${isDashboard && 'mt-1 border-b-4 border-green-950'}`}
							>
								Belanja <FontAwesomeIcon icon={faChevronDown} />
							</DropdownMenuTrigger>
							<DropdownMenuContent onMouseLeave={() => setOpenDropdown(false)}>
								<DropdownMenuSub>
									<DropdownMenuSubTrigger>
										<Link to={'/freshflower'}>Fresh Flowers Bouquet</Link>
									</DropdownMenuSubTrigger>
									<DropdownMenuPortal>
										<DropdownMenuSubContent>
											<DropdownMenuItem>
												<Link to={'/freshflower'}>Rose Variant</Link>
											</DropdownMenuItem>
											<DropdownMenuItem>
												<Link to={'/freshflower'}>Lily Variant</Link>
											</DropdownMenuItem>
											<DropdownMenuItem>
												<Link to={'/freshflower'}>Fresh Flowers</Link>
											</DropdownMenuItem>
											<DropdownMenuItem>
												<Link to={'/freshflower'}>Flowers Box</Link>
											</DropdownMenuItem>
										</DropdownMenuSubContent>
									</DropdownMenuPortal>
								</DropdownMenuSub>
								<DropdownMenuSub>
									<DropdownMenuSubTrigger>
										<Link to={'/artificialflower'}>Artificial Flower Bouquet</Link>
									</DropdownMenuSubTrigger>
									<DropdownMenuPortal>
										<DropdownMenuSubContent>
											<DropdownMenuItem>
												<Link to={'/artificialflower'}>Artificial Flower</Link>
											</DropdownMenuItem>
											<DropdownMenuItem>
												<Link to={'/artificialflower'}>Bloom Box</Link>
											</DropdownMenuItem>
											<DropdownMenuItem>
												<Link to={'/artificialflower'}>Korean Style</Link>
											</DropdownMenuItem>
										</DropdownMenuSubContent>
									</DropdownMenuPortal>
								</DropdownMenuSub>
								<DropdownMenuSub>
									<DropdownMenuSubTrigger>
										<Link to={'/balloon'}>Balloon Bouquet</Link>
									</DropdownMenuSubTrigger>
									<DropdownMenuPortal>
										<DropdownMenuSubContent>
											<DropdownMenuItem>
												<Link to={'/balloon'}>Korean Flower Balloon</Link>
											</DropdownMenuItem>
											<DropdownMenuItem>
												<Link to={'/balloon'}>Hot Air Balloon & Balloon Box</Link>
											</DropdownMenuItem>
											<DropdownMenuItem>
												<Link to={'/balloon'}>Balloon Bouquet</Link>
											</DropdownMenuItem>
										</DropdownMenuSubContent>
									</DropdownMenuPortal>
								</DropdownMenuSub>
								<DropdownMenuSub>
									<DropdownMenuItem>
										<Link to={'/snack'}>Snack Bouquet</Link>
									</DropdownMenuItem>
								</DropdownMenuSub>
								<DropdownMenuSub>
									<DropdownMenuItem>
										<Link to={'/money'}>Money Bouquet</Link>
									</DropdownMenuItem>
								</DropdownMenuSub>
								<DropdownMenuSub>
									<DropdownMenuSubTrigger>
										<Link to={'/dashboard'}>Event</Link>
									</DropdownMenuSubTrigger>
									<DropdownMenuPortal>
										<DropdownMenuSubContent>
											<DropdownMenuItem>
												<Link to={'/dashboard'}>Wedding</Link>
											</DropdownMenuItem>
											<DropdownMenuItem>
												<Link to={'/dashboard'}>Anniversary</Link>
											</DropdownMenuItem>
											<DropdownMenuItem>
												<Link to={'/dashboard'}>Graduation</Link>
											</DropdownMenuItem>
										</DropdownMenuSubContent>
									</DropdownMenuPortal>
								</DropdownMenuSub>
							</DropdownMenuContent>
						</DropdownMenu>
					</li>
					<li>
						<a
							onClick={scrollToAbout}
							className={`font-medium cursor-pointer ${
								activeSection === 'about' && 'pb-1 border-b-4 border-green-950'
							} ${isAbout && 'mt-1 border-b-4 border-green-950'}`}
						>
							Tentang
						</a>
					</li>
					<li>
						<a
							onClick={scrollToContact}
							className={`font-medium cursor-pointer ${
								activeSection === 'contact' && 'pb-1 border-b-4 border-green-950'
							}`}
						>
							Kontak
						</a>
					</li>
				</ul>
			</nav>
			{!userData ? (
				<div className="hidden lg:block">
					<Link
						to={'/register'}
						className="px-5 py-2 items-center bg-[#606F49] text-white rounded-md"
					>
						Beli Sekarang
					</Link>
				</div>
			) : (
				<div className="hidden lg:flex lg:justify-between lg:items-center lg:relative lg:gap-5 lg:ml-11">
					<Link
						to={'/cart'}
						className="fa-lg"
					>
						<FontAwesomeIcon icon={faCartShopping} />
					</Link>
					<DropdownMenu>
						<DropdownMenuTrigger>
							<FontAwesomeIcon icon={faUser} />
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<Link to={'/profile'}>
								<DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
							</Link>
							<DropdownMenuItem
								className="cursor-pointer"
								onClick={handleLogout}
							>
								Logout
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			)}

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
									<Accordion
										type="single"
										collapsible
									>
										<AccordionItem value="item-1">
											<AccordionTrigger>Belanja</AccordionTrigger>
											<AccordionContent>
												<Accordion
													type="single"
													collapsible
													className="ml-3"
												>
													<AccordionItem value="item-1">
														<AccordionTrigger>Fresh Flowers</AccordionTrigger>
														<AccordionContent className="flex flex-col ml-3">
															<Link to={''}>Bouquet</Link>
															<Link to={''}>Vase</Link>
														</AccordionContent>
													</AccordionItem>
													<AccordionItem value="item-2">
														<AccordionTrigger>Category</AccordionTrigger>
														<AccordionContent className="flex flex-col ml-3">
															<Link to={''}>Wedding</Link>
															<Link to={''}>Date</Link>
														</AccordionContent>
													</AccordionItem>
												</Accordion>
											</AccordionContent>
										</AccordionItem>
									</Accordion>
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
									{!userData ? (
										<Link
											to={'/register'}
											className="px-5 pt-[6px] pb-2 items-center text-center bg-[#606F49] text-white rounded-md"
										>
											Beli Sekarang
										</Link>
									) : (
										<>
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
										</>
									)}
								</div>
							</SheetDescription>
						</SheetHeader>
					</SheetContent>
				</Sheet>
			</div>
		</header>
	)
}
