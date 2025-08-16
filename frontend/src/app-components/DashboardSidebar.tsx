import {
  AnalyticsOutline,
  Company,
  BaselineReceipt,
  PersonWorker,
  SharpInventory,
  Dashboard,
} from "@/icons/icons";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { NavLink } from "react-router";

const Routes = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <Dashboard />,
  },
  {
    title: "Employee",
    url: "/employee",
    icon: <PersonWorker />,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: <AnalyticsOutline />,
  },
  {
    title: "Inventory",
    url: "/inventory",
    icon: <SharpInventory />,
  },
  {
    title: "Invoices",
    url: "/invoices",
    icon: <BaselineReceipt />,
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
                  <NavLink
                    to={route.url}
                    className={({ isActive }) =>
                      ` flex items-center gap-2 text-[16px] text-white hover:bg-zinc-300/10
                    p-2 rounded-sm  ${isActive ? " bg-zinc-700/60" : ""}`
                    }
                  >
                    {route.icon}

                    {route.title}
                  </NavLink>
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
