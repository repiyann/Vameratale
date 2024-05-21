import { useState } from 'react'
import { Link } from 'react-router-dom'
import roundLogo from '/round_logo.png'

function Reset() {
	const [password, setPassword] = useState<string>('')
	const [confirmPassword, setConfirmPassword] = useState<string>('')

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
				<h1 className="text-xl font-bold leading-tight mt-72 md:mt-56 mb-6 md:text-5xl">Create New Password</h1>

				<form
					className="mt-10"
					method="POST"
					onSubmit={(e) => {
						e.preventDefault()
					}}
				>
					<div className="mt-4">
						<label className="font-semibold text-xl"> Password </label>
						<input
							type="password"
							placeholder="Enter Password"
							minLength={8}
							className="w-full px-4 py-4 text-xl rounded-xl bg-white mt-1 border focus:outline-none"
							autoFocus
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="mt-4">
						<label className="font-semibold text-xl"> Confirm Password </label>
						<input
							type="password"
							placeholder="Enter Confirm Password"
							minLength={8}
							className="w-full px-4 py-4 text-xl rounded-xl bg-white mt-1 border focus:outline-none"
							autoFocus
							required
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</div>
					<Link
						to={'/login'}
						className="w-full flex items-center justify-center bg-[#ff7474] hover:bg-[#ff5d5d] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 text-white font-semibold rounded-[28px] px-4 py-3 mt-4 border-white border-4"
					>
						Reset Password
					</Link>
				</form>
			</div>
			<div className="col-start-2 col-end-2 bg-white hidden md:flex md:justify-center">
				<img
					src={roundLogo}
					width={500}
				/>
			</div>
		</section>
	)
}

export default Reset
