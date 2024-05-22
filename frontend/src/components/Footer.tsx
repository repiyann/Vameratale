import logo from '/name_logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons'

export default function Footer() {
	return (
		<footer className="bg-[#32473C] px-5 py-10 md:px-20 lg:px-72 lg:pt-10 lg:pb-5">
			<div className="flex flex-col items-start gap-2 justify-center md:grid md:grid-cols-4 md:gap-16">
				<div className="col-start-1 col-end-1 text-white">
					<img
						src={logo}
						alt="logo Vameratale"
						width={150}
					/>
					<div className="mt-3">
						Jl. Harmony 2-3 11-3, Sukamantri, Kec. Tamansari, Kabupaten Bogor, Jawa Barat 16610
					</div>
					<div className="mt-3 flex flex-row gap-5">
						<a href="#">
							<FontAwesomeIcon icon={faFacebook} />
						</a>
						<a
							href="https://www.instagram.com/vameratale"
							target="_blank"
						>
							<FontAwesomeIcon icon={faInstagram} />
						</a>
						<a
							href="https://api.Whatsapp.com/send?phone=+6282282262157&text=Hello"
							target="_blank"
						>
							<FontAwesomeIcon icon={faWhatsapp} />
						</a>
						<a href="#">
							<FontAwesomeIcon icon={faLinkedin} />
						</a>
					</div>
				</div>
				<div className="col-start-2 col-end-2 text-white">
					<h1 className="text-lg font-medium">Information</h1>
					<ul>
						<li>About Us</li>
						<li>FAQ</li>
					</ul>
				</div>
				<div className="col-start-3 col-end-3 text-white">
					<h1 className="text-lg font-medium">Customer Service</h1>
					<ul>
						<li>Contact</li>
						<li>Privacy Policy</li>
					</ul>
				</div>
				<div className="col-start-4 col-end-4 text-white">
					<h1 className="text-lg font-medium">Quick Links</h1>
					<ul>
						<li>Anniversary</li>
						<li>Wedding</li>
						<li>Birthday</li>
						<li>Graduation</li>
					</ul>
				</div>
			</div>
			<div className="flex mt-10 justify-center text-white">Copyright &copy; 2024 By Vameratale</div>
		</footer>
	)
}
