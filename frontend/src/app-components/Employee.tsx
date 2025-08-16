import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddEmployeeForm from "./AddEmployeeForm";
import EmployeeTable from "./EmployeeTable";
import useUserStore from "../store/userStore";
// import { toast } from "sonner";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
function Employee() {
  // const [open, setOpen] = React.useState(false);
  const { user } = useUserStore();
  // const queryClient = useQueryClient();

  // const handleEmployeeSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();

  // const request = await fetch(import.meta.env.VITE_BACKEND_ADD_EMPLOYEE_URL, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },

  //   body: JSON.stringify(employeeDetails),
  // });
  // };
  return (
    <>
      <header className="flex h-16 items-center gap-4 border-b  px-6 bg-transparent">
        <SidebarTrigger className="ml-2" />
        <div className="flex items-center justify-between w-full">
          <div className="font-semibold">Employee Portal</div>
        </div>
      </header>
      <div className="w-[90%] mx-auto mt-10 ">
        <h1 className="text-4xl font-bold">Employee Management</h1>
        <p className="text-zinc-500 mt-2">
          Manage your team members and their information
        </p>
      </div>
      <main className="h-full w-[90%] mx-auto mt-6">
        <Tabs defaultValue="employee-table">
          <TabsList className="bg-zinc-800 ">
            <TabsTrigger
              value="employee-table"
              className="text-sm  data-[state=inactive]:text-zinc-400 data-[state=active]:shadow-inner
      data-[state=active]:shadow-white/20 cursor-pointer"
            >
              Table
            </TabsTrigger>
            <TabsTrigger
              value="employee-form"
              className="w-full text-sm  data-[state=inactive]:text-zinc-400 data-[state=active]:shadow-inner
      data-[state=active]:shadow-white/20 cursor-pointer"
            >
              Form
            </TabsTrigger>
          </TabsList>
          <TabsContent value="employee-form">
            <div className="w-full border-1  border-zinc-700 rounded-2xl">
              <AddEmployeeForm AdminId={user.id} />
            </div>
          </TabsContent>
          <TabsContent value="employee-table">
            <div className="rounded-2xl overflow-hidden border-1  border-zinc-700">
              <EmployeeTable />
            </div>
          </TabsContent>
        </Tabs>
      </main>
      {}
    </>
  );
}

export default Employee;
