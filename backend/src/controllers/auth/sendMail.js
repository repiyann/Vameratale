import nodemailer from 'nodemailer'
import 'dotenv/config'

const transporter = nodemailer.createTransport({
	service: 'gmail',
	port: 587,
	secure: false,
	auth: {
		user: process.env.USER_EMAIL,
		pass: process.env.APP_PASSWORD
	}
})

async function sendVerificationEmail(email, token) {
	const mailOptions = {
		from: {
			name: 'Vameratale',
			address: process.env.USER_EMAIL
		},
		to: email,
		subject: 'Email Verification',
		html: `
			<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
				<div style="margin:50px auto;width:70%;padding:20px 0">
					<div style="border-bottom:1px solid #eee">
						<a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Vameratale</a>
					</div>
					<p style="font-size:1.1em">Hi,</p>
					<p>Thank you for registering with Vameratale. Please verify your email by clicking on the following link:</p>
          <a href="${process.env.FRONTEND_URL}/verify-email?token=${token}&email=${email}" style="background: #00466a;margin: 0 auto;width: max-content;padding: 10px 20px;color: #fff;border-radius: 4px;text-decoration: none;">Verify Email</a>
					<p style="font-size:0.9em;">Regards,<br />Vameratale Team</p>
					<hr style="border:none;border-top:1px solid #eee" />
					<div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
						<p>Vameratale Inc</p>
						<p>Bogor</p>
						<p>Indonesia</p>
					</div>
				</div>
			</div>
		`
	}

	return transporter.sendMail(mailOptions)
}

async function sendOTPEmail(email, otp) {
	const mailOptions = {
		from: {
			name: 'Vameratale',
			address: process.env.USER_EMAIL
		},
		to: email,
		subject: 'Your OTP Code',
		html: `
			<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
				<div style="margin:50px auto;width:70%;padding:20px 0">
					<div style="border-bottom:1px solid #eee">
						<a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Vameratale</a>
					</div>
					<p style="font-size:1.1em">Hi,</p>
					<p>Use the following OTP to complete your action. OTP is valid for 10 minutes:</p>
					<h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
					<p style="font-size:0.9em;">Regards,<br />Vameratale Team</p>
					<hr style="border:none;border-top:1px solid #eee" />
					<div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
						<p>Vameratale Inc</p>
						<p>Bogor</p>
						<p>Indonesia</p>
					</div>
				</div>
			</div>
		`
	}

	return transporter.sendMail(mailOptions)
}

export { sendVerificationEmail, sendOTPEmail }
