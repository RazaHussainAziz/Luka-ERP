import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { UserAvatarOutline } from "@/icons/icons";
import { User, Mail, Lock, Eye, EyeOff, Phone } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
function Employee() {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <>
      <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
        <SidebarTrigger className="ml-2" />
        <div className="font-semibold">Employee Portal</div>
      </header>
      <main className="my-5">
        <div className="text-center flex justify-center items-center">
          <h1 className="p-3  inline-block rounded-xl">
            <UserAvatarOutline width={50} height={50} className="text-white" />
          </h1>
          <div className="flex flex-col items-start">
            <h1 className="md:text-4xl font-bold">Employee Management</h1>
            <span className="text-muted-foreground text-lg">
              Create and manage employee records
            </span>
          </div>
        </div>
        <form
          className="outline-1 outline-zinc-300/30 px-4 py-5 flex flex-col gap-5 rounded-md
          shadow-sm shadow-white/10 max-w-[400px] mx-auto mt-15 "
        >
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Add New Employee</h1>
            <span className="text-zinc-300">
              Fill in the details to create a new employee record
            </span>
          </div>
          <div className="flex flex-col gap-2 ">
            <Label htmlFor="username" className="text-md text-zinc-300">
              Username *
            </Label>
            <div className=" bg-white/20 rounded-sm flex items-center ">
              <User className=" h-9 w-9 px-2" />
              <Input
                id="username"
                type="text"
                autoComplete="off"
                maxLength={30}
                minLength={5}
                required={true}
                className="bg-transparent border-0 placeholder:text-zinc-500 focus-visible:ring-0 p-0 pr-2"
                placeholder="@username"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 ">
            <Label htmlFor="email" className="text-md text-zinc-300">
              Email *
            </Label>
            <div className=" bg-white/20 rounded-sm flex items-center ">
              <Mail className=" h-9 w-9 px-2" />
              <Input
                id="email"
                type="email"
                autoComplete="off"
                maxLength={50}
                required={true}
                className="bg-transparent border-0 placeholder:text-zinc-500 focus-visible:ring-0 p-0 pr-2"
                placeholder="example@gmail.com"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 ">
            <Label htmlFor="password" className="text-md text-zinc-300">
              Password *
            </Label>
            <div className=" bg-white/20 rounded-sm flex items-center ">
              <Lock className=" h-9 w-9 px-2" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                required={true}
                minLength={8}
                maxLength={30}
                autoComplete="off"
                className="bg-transparent border-0 focus-visible:ring-0 p-0"
              />
              {showPassword ? (
                <EyeOff
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer h-9 w-9 px-2 "
                />
              ) : (
                <Eye
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer h-9 w-9 px-2"
                />
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 ">
            <Label htmlFor="phone" className="text-md text-zinc-300">
              Phone *
            </Label>
            <div className=" bg-white/20 rounded-sm flex items-center ">
              <Phone className=" h- w-9 px-2" />
              <Input
                id="phone"
                type="text"
                autoComplete="off"
                minLength={11}
                maxLength={11}
                required={true}
                className="bg-transparent border-0 placeholder:text-zinc-500 focus-visible:ring-0 p-0 pr-2"
                placeholder="example@gmail.com"
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="role" className="text-md text-zinc-300">
              Role *
            </Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Role" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 ">
                <SelectGroup>
                  <SelectLabel>Roles</SelectLabel>
                  <SelectItem value="hr-manager">HR Manager</SelectItem>
                  <SelectItem value="inventory-manager">
                    Inventory Manager
                  </SelectItem>
                  <SelectItem value="slaesman">Salesman</SelectItem>
                  <SelectItem value="finance-manager">
                    Finance Manager
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2 ">
            <Label htmlFor="phone" className="text-md text-zinc-300">
              Joining Date *
            </Label>
            <div className=" bg-white/20 rounded-sm flex items-center ">
              <Input
                id="date"
                type="date"
                required={true}
                className="bg-transparent border-0 placeholder:text-zinc-500 focus-visible:ring-0 p-0 pr-2"
              />
            </div>
          </div>
          <Button className="cursor-pointer text-md">Create Employee</Button>
        </form>
      </main>
    </>
  );
}

export default Employee;
