import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";
import useMutateEmployeeQuery from "@/hooks/useMutateEmplyeeQuery";

const AddEmployeeForm: React.FC = function AddEmployeeForm() {
  const { mutate, isPending } = useMutateEmployeeQuery();
  const [employeeDetails, setEmployeeDetails] = React.useState({
    username: "",
    email: "",
    password: "",
    salary: 0,
    department: "",
    phone: "",
    joining_date: new Date().toLocaleString(undefined, {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }),
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    mutate(employeeDetails);
  };

  return (
    <>
      <div className="p-5">
        <h1 className="text-3xl font-bold">Add New Employee</h1>
        <p className="text-zinc-400">
          Fill out the form below to add a new employee to your organization.
        </p>
      </div>
      <form onSubmit={(event) => handleSubmit(event)} className="p-5">
        <div className="grid grid-cols-2 gap-y-10 gap-x-20">
          <div className="flex flex-col gap-2">
            <Label htmlFor="username">Full Name</Label>
            <Input
              id="username"
              type="text"
              value={employeeDetails.username}
              onChange={(e) =>
                setEmployeeDetails((prevState) => ({
                  ...prevState,
                  username: e.target.value,
                }))
              }
              className="px-4 py-5 focus:ring-0 "
              maxLength={30}
              minLength={5}
              autoComplete="off"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="off"
              value={employeeDetails.email}
              onChange={(e) =>
                setEmployeeDetails((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }))
              }
              maxLength={50}
              className="px-4 py-5"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              max={40}
              min={8}
              value={employeeDetails.password}
              onChange={(e) =>
                setEmployeeDetails((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                }))
              }
              autoComplete="off"
              required
              minLength={8}
              maxLength={30}
              className="px-4 py-5"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="salary">Salary</Label>
            <Input
              id="salary"
              type="number"
              className="px-4 py-5"
              value={employeeDetails.salary}
              onChange={(e) =>
                setEmployeeDetails((prevState) => ({
                  ...prevState,
                  salary: Number(e.target.value),
                }))
              }
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="department">Department</Label>
            <Input
              id="department"
              type="text"
              maxLength={30}
              value={employeeDetails.department}
              onChange={(e) =>
                setEmployeeDetails((prevState) => ({
                  ...prevState,
                  department: e.target.value,
                }))
              }
              autoComplete="off"
              className="px-4 py-5"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="text"
              maxLength={30}
              value={employeeDetails.phone}
              onChange={(e) =>
                setEmployeeDetails((prevState) => ({
                  ...prevState,
                  phone: e.target.value,
                }))
              }
              className="px-4 py-5"
              autoComplete="off"
              required
            />
          </div>
        </div>
        <Button
          type="submit"
          className="mt-10 cursor-pointer"
          disabled={isPending}
        >
          Add Employee
        </Button>
      </form>
    </>
  );
};

export default AddEmployeeForm;
