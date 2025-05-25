import { LayoutDashboard } from "lucide-react";
import {
  AnalyticsOutline,
  Company,
  InvoiceOutline,
  PersonWorker,
  SharpInventory,
} from "@/icons/icons";
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

import { NavLink } from "react-router";

const Routes = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    title: "Employee",
    url: "/dashboard/employee",
    icon: <PersonWorker />,
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: <AnalyticsOutline />,
  },
  {
    title: "Inventory",
    url: "/dashboard/inventory",
    icon: <SharpInventory />,
  },
  {
    title: "Invoices",
    url: "/dashboard/invoices",
    icon: <InvoiceOutline />,
  },
];
function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-zinc-900">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              <h1 className="text-xl flex items-center rounded-md gap-4 p-2 font-bold text-white hover:bg-zinc-800">
                <Company /> Luka Inc.
              </h1>
              <SidebarGroupLabel>Applications</SidebarGroupLabel>
              {Routes.map((route) => (
                <SidebarMenuItem key={route.title}>
                  <SidebarMenuButton asChild className="hover:bg-zinc-700">
                    <NavLink to={route.url}>
                      {route.icon}
                      <span className="text-white">{route.title}</span>
                    </NavLink>
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

export default DashboardSidebar;
