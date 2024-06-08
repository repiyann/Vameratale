import { useEffect } from 'react'
import { Card } from '@/components/ui/card'
import roundLogo from '/round_logo.png'

export default function About() {
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	})

	return (
		<>
			<section className="lg:px-72 lg:py-20">
				<Card className="grid grid-cols-2 gap-10 px-10 py-10 bg-[#FDEBE7] shadow-xl">
					<div className="col-start-1 col-end-1">
						<img
							src={roundLogo}
							alt="logo Vameratale"
						/>
					</div>
					<div className="col-start-2 col-end-2">
						<p className="font-semibold">
							Vameratale merupakan handicraft gift shop yang lahir di Bogor pada pertengahan 2022. Tidak berjalan
							sendirian, Vameratale adalah bagian dari Petrikor Solid Produksi sebagai rumah utama.
						</p>
						<br />
						<p className="font-semibold">
							Dibuat dengan hati untuk sampai ke hati, moto yang dihidupi Vameratale sejak awal berdiri. Kami percaya
							seluruh handicraft gift yang diproduksi pasti memiliki pesan yang ingin disampaikan oleh pemberi ke
							penerima. Hal inilah yang membuat kami akan mengupayakan kualitas produk semaksimal mungkin, dengan
							menyertakan cinta di setiap prosesnya dan berharap pesan yang disampaikan oleh pemberi ke penerima dapat
							sampai ke hati.
						</p>
						<br />
						<p className="font-semibold">Mari ungkapkan kata hatimu dengan Vameratale ❤</p>
					</div>
				</Card>
			</section>
		</>
	)
}
