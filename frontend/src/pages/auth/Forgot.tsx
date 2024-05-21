import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import roundLogo from '/round_logo.png'

function Forgot() {
	const [email, setEmail] = useState<string>('')

	return (
		<section className="flex flex-col h-screen items-center md:grid md:grid-cols-2 bg-white">
			<div
				className="col-start-1 col-end-1 items-center justify-center bg-[#F4ACB7] px-6 lg:px-72 lg:py-20"
				style={{
					backgroundImage: 'url(/Frame.png)',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
					width: '100%',
					height: '100%',
					zoom: '72%'
				}}
			>
				<h1 className="text-xl font-bold leading-tight mt-64 md:mt-44 mb-6 md:text-5xl">Forgot your password?</h1>
        <h2 className='text-lg font-semibold'>Enter your email below to receive a password reset link</h2>

				<form
					className="mt-10"
					method="POST"
					onSubmit={(e) => {
						e.preventDefault()
					}}
				>
					<div>
						<label className="font-semibold text-xl"> Email Address </label>
						<input
							type="text"
							placeholder="Enter Email Address"
							className="w-full px-4 py-4 text-xl rounded-xl bg-white mt-1 border focus:outline-none focus:ring-2 focus:ring-[#E28392]"
							autoFocus
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<Link
						to={'/verify'}
						className="w-full flex items-center justify-center bg-[#ff7474] hover:bg-[#ff5d5d] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 text-white font-semibold rounded-[28px] px-4 py-3 mt-4 border-white border-4"
					>
						Kirim Kode
					</Link>
				</form>

				<div className="my-6 flex items-center space-x-10">
					<hr className="flex-grow border-white" />
					<span className="text-xl">Atau Masuk Dengan</span>
					<hr className="flex-grow border-white" />
				</div>
				<div className="flex justify-center gap-5 mb-7">
					<FontAwesomeIcon
						icon={faFacebook}
						size="2xl"
					/>
					<FontAwesomeIcon
						icon={faGoogle}
						size="2xl"
					/>
				</div>
				<div className="mt-2 items-center text-xl flex justify-center">
					Don't have an account?
					<Link
						to={'/register'}
						className="text-blue-700 ml-1 text-xl hover:text-blue-900 font-semibold underline"
					>
						Sign In
					</Link>
				</div>
			</div>
			<div className="col-start-2 col-end-2 bg-white hidden md:flex md:justify-center">
				<img
					src={roundLogo}
					width={500}
				/>
			</div>
			<nav className="absolute top-0 left-0 right-0 p-4 flex justify-between w-full">
				<Link
					to={'/login'}
					className="text-white bg-[#ff7474] hover:bg-[#ff5d5d] px-4 py-2 rounded-2xl"
				>
					Back
				</Link>
			</nav>
		</section>
	)
}

export default Forgot
