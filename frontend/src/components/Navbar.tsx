import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faBars } from '@fortawesome/free-solid-svg-icons'
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

function Navbar() {
	const [openDropdown, setOpenDropdown] = useState<boolean>(false)
	const [shadow, setShadow] = useState<boolean>(false)
	const [activeSection, setActiveSection] = useState<string>('')
	const location = useLocation()
	const navigate = useNavigate()
	const isDashboard: boolean = location.pathname === '/dashboard'
	const isAbout: boolean = location.pathname === '/about'

	function scrollToHome(): void {
		window.scrollTo({ top: 0, behavior: 'smooth' })
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

	return (
		<header
			className={`px-6 py-3 md:px-16 md:py-2 lg:px-36 lg:py-4 bg-[#FDEBE7] flex sticky top-0 z-50 justify-between items-center ${
				shadow && 'shadow-lg'
			}`}
		>
			{isDashboard || isAbout ? (
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
				<ul className="hidden lg:flex lg:justify-between lg:items-center lg:relative lg:gap-12">
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
						<Link
							to={'/about'}
							className={`font-medium cursor-pointer ${
								activeSection === 'about' && 'pb-1 border-b-4 border-green-950'
							} ${isAbout && 'mt-1 border-b-4 border-green-950'}`}
						>
							Tentang
						</Link>
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
			<div className="hidden lg:block">
				<Link
					to={'/register'}
					className="px-5 py-2 items-center bg-[#606F49] text-white rounded-md"
				>
					Beli Sekarang
				</Link>
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
									<Link
										to={'/register'}
										className="px-5 pt-[6px] pb-2 items-center text-center bg-[#606F49] text-white rounded-md"
									>
										Beli Sekarang
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

export default Navbar
