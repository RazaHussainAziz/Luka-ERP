import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

import DashboardSidebar from "./DashboardSidebar";
import { Outlet } from "react-router";

function Dashboard() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset className="bg-black">
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Dashboard;
