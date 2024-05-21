import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useUserContext } from '@/utils/authProvider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import NavbarUser from '@/components/NavbarUser'

function Dashboard() {
	const { userData } = useUserContext()

	return (
		<>
			{userData ? <NavbarUser /> : <Navbar />}
			<div className="flex">
				<section
					id="sidebar"
					className="md:block md:w-64 md:bg-[#FFCAD4] md:h-64 md:my-20 md:sticky md:top-40 md:rounded-r-lg hidden"
				>
					<div className="py-20 px-10 gap-3">
						<Accordion type="multiple">
							<AccordionItem value="item-1">
								<AccordionTrigger>Acara</AccordionTrigger>
								<AccordionContent className="flex flex-col ml-3">
									<div>Pernikahan</div>
									<div>Wisuda</div>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-2">
								<AccordionTrigger>Hiasan</AccordionTrigger>
								<AccordionContent className="flex flex-col ml-3">
									<div>Asli</div>
									<div>Palsu</div>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-3">
								<AccordionTrigger>Jenis Bunga</AccordionTrigger>
								<AccordionContent className="flex flex-col ml-3">
									<div>Mawar</div>
									<div>Melati</div>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>
				</section>
				<section
					id="main-content"
					className="flex-grow"
				>
					<div className="flex my-16 px-20 flex-col">
						<div className="grid grid-cols-4 gap-5 md:gap-10 mt-5">
							<div className="col-start-1 col-end-1">
								<div className="px-5 py-40 bg-black rounded-md"></div>
							</div>
							<div className="col-start-2 col-end-2">
								<div className="px-5 py-40 bg-black rounded-md"></div>
							</div>
							<div className="col-start-3 col-end-3">
								<div className="px-5 py-40 bg-black rounded-md"></div>
							</div>
							<div className="col-start-4 col-end-4">
								<div className="px-5 py-40 bg-black rounded-md"></div>
							</div>
							<div className="col-start-1 col-end-1">
								<div className="px-5 py-40 bg-black rounded-md"></div>
							</div>
							<div className="col-start-2 col-end-2">
								<div className="px-5 py-40 bg-black rounded-md"></div>
							</div>
							<div className="col-start-3 col-end-3">
								<div className="px-5 py-40 bg-black rounded-md"></div>
							</div>
							<div className="col-start-4 col-end-4">
								<div className="px-5 py-40 bg-black rounded-md"></div>
							</div>
							<div className="col-start-1 col-end-1">
								<div className="px-5 py-40 bg-black rounded-md"></div>
							</div>
							<div className="col-start-2 col-end-2">
								<div className="px-5 py-40 bg-black rounded-md"></div>
							</div>
							<div className="col-start-3 col-end-3">
								<div className="px-5 py-40 bg-black rounded-md"></div>
							</div>
							<div className="col-start-4 col-end-4">
								<div className="px-5 py-40 bg-black rounded-md"></div>
							</div>
							<div className="col-start-1 col-end-1">
								<div className="px-5 py-40 bg-black rounded-md"></div>
							</div>
							<div className="col-start-2 col-end-2">
								<div className="px-5 py-40 bg-black rounded-md"></div>
							</div>
							<div className="col-start-3 col-end-3">
								<div className="px-5 py-40 bg-black rounded-md"></div>
							</div>
							<div className="col-start-4 col-end-4">
								<div className="px-5 py-40 bg-black rounded-md"></div>
							</div>
						</div>
					</div>
				</section>
			</div>

			<Footer />
		</>
	)
}

export default Dashboard
