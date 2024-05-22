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

export default function NavbarUser() {
	const [openDropdown, setOpenDropdown] = useState<boolean>(false)
	const [shadow, setShadow] = useState<boolean>(false)
	const [activeSection, setActiveSection] = useState<string>('')
	const location = useLocation()
	const navigate = useNavigate()
	const { handleLogout } = useUserContext()
	const isDashboard: boolean = location.pathname === '/dashboard'

	function scrollToHome(): void {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	function scrollToAbout(): void {
		isDashboard
			? (navigate('/'),
			setTimeout(() => {
					const aboutSection = document.getElementById('about')
					aboutSection && aboutSection.scrollIntoView({ behavior: 'smooth' })
			}, 100))
			: (() => {
					const aboutSection = document.getElementById('about')
					aboutSection && aboutSection.scrollIntoView({ behavior: 'smooth' })
			})()
	}

	function scrollToContact(): void {
		isDashboard
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

	return (
		<header
			className={`flex px-6 py-3 md:px-16 md:py-2 lg:px-60 lg:py-4 bg-[#FDEBE7] sticky top-0 z-50 justify-between items-center ${
				shadow && 'shadow-lg'
			}`}
		>
			{isDashboard ? (
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
				<ul className="hidden lg:flex lg:justify-between lg:items-center lg:relative lg:gap-5">
					<li>
						{isDashboard ? (
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
								Katalog <FontAwesomeIcon icon={faChevronDown} />
							</DropdownMenuTrigger>
							<DropdownMenuContent onMouseLeave={() => setOpenDropdown(false)}>
								<DropdownMenuSub>
									<DropdownMenuSubTrigger>
										<span>Fresh Flowers</span>
									</DropdownMenuSubTrigger>
									<DropdownMenuPortal>
										<DropdownMenuSubContent>
											<DropdownMenuItem>
												<span>Bouquet</span>
											</DropdownMenuItem>
											<DropdownMenuItem>
												<span>Vase</span>
											</DropdownMenuItem>
											<DropdownMenuItem>
												<Link to={'/dashboard'}>More...</Link>
											</DropdownMenuItem>
										</DropdownMenuSubContent>
									</DropdownMenuPortal>
								</DropdownMenuSub>
								<DropdownMenuSub>
									<DropdownMenuSubTrigger>
										<span>Category</span>
									</DropdownMenuSubTrigger>
									<DropdownMenuPortal>
										<DropdownMenuSubContent>
											<DropdownMenuItem>
												<span>Wedding</span>
											</DropdownMenuItem>
											<DropdownMenuItem>
												<span>Date</span>
											</DropdownMenuItem>
											<DropdownMenuItem>
												<Link to={'/dashboard'}>More...</Link>
											</DropdownMenuItem>
										</DropdownMenuSubContent>
									</DropdownMenuPortal>
								</DropdownMenuSub>
							</DropdownMenuContent>
						</DropdownMenu>
					</li>
					<li>
						<a
							className={`font-medium cursor-pointer ${
								activeSection === 'about' && 'pb-1 border-b-4 border-green-950'
							}`}
							onClick={scrollToAbout}
						>
							Tentang
						</a>
					</li>
					<li>
						<a
							className={`font-medium cursor-pointer ${
								activeSection === 'contact' && 'pb-1 border-b-4 border-green-950'
							}`}
							onClick={scrollToContact}
						>
							Kontak
						</a>
					</li>
				</ul>
			</nav>

			<div className="lg:flex lg:justify-between lg:items-center lg:relative lg:gap-5 lg:ml-11">
				<Link
					to={''}
					className="fa-lg"
				>
					<FontAwesomeIcon icon={faCartShopping} />
				</Link>
				<DropdownMenu>
					<DropdownMenuTrigger>
						<FontAwesomeIcon icon={faUser} />
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>
							<Link to={'/profile'}>Profile</Link>
						</DropdownMenuItem>
						<DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
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
									<Accordion
										type="single"
										collapsible
									>
										<AccordionItem value="item-1">
											<AccordionTrigger>Katalog</AccordionTrigger>
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
									<Link
										to={''}
										className="flex flex-1 fa-solid fa-2xl justify-center items-center border-4 border-black rounded-full p-7 mt-4 mx-6 sm:mx-14 sm:py-11 sm:mt-4"
									>
										<FontAwesomeIcon icon={faUser} />
									</Link>
								</div>
							</SheetDescription>
						</SheetHeader>
					</SheetContent>
				</Sheet>
			</div>
		</header>
	)
}
