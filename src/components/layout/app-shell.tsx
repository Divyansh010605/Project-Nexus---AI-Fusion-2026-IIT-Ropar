'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FileText,
  LayoutDashboard,
  Map,
  ShoppingBag,
  Menu,
} from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';

const navItems = [
  {
    href: '/dashboard',
    icon: LayoutDashboard,
    label: 'Dashboard',
  },
  {
    href: '/marketplace',
    icon: ShoppingBag,
    label: 'Marketplace',
  },
  {
    href: '/map',
    icon: Map,
    label: 'Campus Map',
  },
  {
    href: '/summarizer',
    icon: FileText,
    label: 'Summarizer',
  },
];

function NavMenu({ isCollapsed }: { isCollapsed: boolean }) {
  const pathname = usePathname();
  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            isActive={pathname === item.href}
            tooltip={isCollapsed ? item.label : undefined}
            asChild
          >
            <Link href={item.href}>
              <item.icon />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

function MobileNav() {
  const userAvatar = getPlaceholderImage('userAvatar');
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] p-0 bg-sidebar">
        <SidebarHeader className="border-b border-sidebar-border">
          <h2 className="font-headline text-2xl font-bold text-sidebar-foreground p-2">
            Project Nexus
          </h2>
        </SidebarHeader>
        <div className="p-4">
          <NavMenu isCollapsed={false} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border">
           <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={userAvatar?.imageUrl} alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-sidebar-foreground">
                <span className="text-sm font-semibold">Jane Doe</span>
                <span className="text-xs text-sidebar-foreground/80">
                  Student
                </span>
              </div>
            </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const userAvatar = getPlaceholderImage('userAvatar');
  return (
    <SidebarProvider>
      <Sidebar variant="inset" collapsible="icon">
        <SidebarHeader>
          <h2 className="font-headline text-2xl font-bold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
            Project Nexus
          </h2>
          <h2 className="font-headline text-2xl font-bold text-sidebar-foreground hidden group-data-[collapsible=icon]:block">
            PN
          </h2>
        </SidebarHeader>
        <SidebarContent>
          <NavMenu isCollapsed={true} />
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={userAvatar?.imageUrl} alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-sidebar-foreground group-data-[collapsible=icon]:hidden">
              <span className="text-sm font-semibold">Jane Doe</span>
              <span className="text-xs text-sidebar-foreground/80">
                Student
              </span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm md:justify-end">
          <MobileNav />
          <SidebarTrigger className="hidden md:flex" />
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
