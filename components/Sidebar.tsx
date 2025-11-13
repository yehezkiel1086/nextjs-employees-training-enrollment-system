import { Calendar, Home, Inbox, LogOut, User } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { verifySession } from "@/app/lib/dal";

export async function UserSidebar() {
  const session = await verifySession()

  const items = [
  {
    title: "Dashboard",
    url: `/${session.role === 5150? "admin": "user"}/dashboard`,
    icon: Home,
  },
  {
    title: "All Trainings",
    url: `/${session.role === 5150? "admin": "user"}/trainings`,
    icon: Inbox,
  },
  {
    title: "Enrolled Trainings",
    url: `/${session.role === 5150? "admin": "user"}/enrolled-trainings`,
    icon: Calendar,
  },
  {
    title: "Profile",
    url: `/${session.role === 5150? "admin": "user"}/profile`,
    icon: User,
  },
  {
    title: "Logout",
    url: "/logout",
    icon: LogOut,
  },
];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{session.role === 5150? "Admin": "User"} Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
