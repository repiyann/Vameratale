import { useContext } from 'react'
import { AdminContext } from './authAdminService'

export function useAdminContext() {
	const context = useContext(AdminContext)
	if (context === undefined) {
		throw new Error('useAdminContext must be used within an AdminProvider')
	}
	return context
}
