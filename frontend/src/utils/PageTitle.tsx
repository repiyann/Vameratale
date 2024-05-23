import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface PageTitleProps {
	title: string
}

function PageTitle({ title }: PageTitleProps) {
	const location = useLocation()

	useEffect(() => {
		document.title = title
	}, [location, title])

	return null
}

export default PageTitle
