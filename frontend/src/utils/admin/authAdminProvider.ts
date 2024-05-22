import { useContext } from "react"
import { AdminContext } from "./authAdminService"

export function useAdminContext() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider')
  }
  return context
}