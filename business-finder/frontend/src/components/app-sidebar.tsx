import * as React from "react"
import {
  BookOpen,
  Building2,
  Contact,
  HomeIcon,
  LogIn,
  Settings2,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ModeToggle } from "./mode-toggle"
import { useAuth } from "@/hooks/use-login"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"

const navMainData = [
  {
    title: "Home",
    url: "/",
    icon: HomeIcon,
    isActive: true,
  },
  {
    title: "About",
    url: "/about",
    icon: BookOpen,
  },
  {
    title: "Contact us!",
    url: "/contact-us",
    icon: Contact,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings2,
  },
  {
    title: "Businesses",
    url: "/businesslistings",
    icon: Building2,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const isLoggedIn = useAuth()

  const user = JSON.parse(localStorage.getItem("user") || '{}')

  const currentUser = {
    name: user.name || "Guest",
    email: user.email || "guest@example.com",
    avatar: user.avatar || "../assets/TeamPhoto.jfif",
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainData} />
      </SidebarContent>
      <SidebarFooter>
        <ModeToggle />
        {isLoggedIn ? (
          <NavUser user={{ ...currentUser, avatar: currentUser.avatar }} />
        ) : (
          <Link to="/login">
            <Button className="bg-purpleCustom hover:bg-white w-9">
              <LogIn />
            </Button>
          </Link>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
