import { SidebarProvider } from "@/components/ui/sidebar"
import { UserSidebar } from "@/components/UserSidebar"

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <UserSidebar />
      <main className="w-full px-8 py-4">
        {children}
      </main>
    </SidebarProvider>
  )
}
