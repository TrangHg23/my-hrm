import * as React from "react";
import Image from "next/image";
import {
  LogOut,
  ChevronsUpDown,
  User,
  Settings,
} from "lucide-react";
import { adminNavItems } from "@/features/admin/constants/admin-nav-items";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuthStore } from "@/features/auth/stores/auth";
import { useState } from "react";


export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const user = useAuthStore((state) => state.user);

  const [activeItem, setActiveItem] = useState("employees");

  const getFallbackName = (name: string) => {
    if (!name) return "AD";
    return name.charAt(0).toUpperCase();
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-border" {...props}>
      <SidebarHeader className="h-16 flex items-center justify-center px-4 group-data-[collapsible=icon]:px-2">
        <div className="flex w-full items-center gap-2 group-data-[collapsible=icon]:justify-center">
          <div className="size-8 flex items-center justify-center shrink-0">
            <Image src="/logo.png" alt="HRM Portal Logo" width={32} height={32} className="object-contain" />
          </div>
          <span className="font-bold text-lg text-primary truncate group-data-[collapsible=icon]:hidden">
            HRM Portal
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 mt-4">
        <SidebarMenu className="gap-2">
          {adminNavItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                isActive={activeItem === item.id} 
                onClick={() => setActiveItem(item.id)}
                className={`h-12 transition-all group ${
                  activeItem === item.id
                    ? "bg-sidebar-accent text-primary"
                    : "hover:bg-sidebar-accent hover:text-primary"
                }`}
              >
                <a href={item.url} className="flex items-center gap-4">
                  <item.icon
                    className={`size-5 shrink-0 transition-transform ${
                      activeItem === item.id
                        ? "scale-110"
                        : "group-hover:scale-110"
                    }`}
                  />
                  <span
                    className={`font-medium group-data-[collapsible=icon]:hidden ${
                      activeItem === item.id
                        ? "text-primary"
                        : "text-foreground group-hover:text-primary"
                    }`}
                  >
                    {item.title}
                  </span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="bg-transparent hover:bg-transparent data-[state=open]:bg-transparent"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                      {getFallbackName(user?.name || "")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden ml-2">
                    <span className="truncate font-semibold text-foreground">
                      {user?.name || "Admin"}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user?.email || "admin@example.com"}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4 group-data-[collapsible=icon]:hidden" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="right"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getFallbackName(user?.name || "")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {user?.name}
                      </span>
                      <span className="truncate text-xs text-muted-foreground">
                        {user?.email}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 size-4" />
                    Hồ sơ cá nhân
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="mr-2 size-4" />
                    Cài đặt
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer font-medium">
                  <LogOut className="mr-2 size-4" />
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
