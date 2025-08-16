import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useFetchEmployeeQuery } from "@/hooks/useFetchEmployeeQuery";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

function EmployeeTable() {
  const { data, isLoading } = useFetchEmployeeQuery();
  const queryClient = useQueryClient();
  const handleDelete = async (employeeId: number) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_DELETE_EMPLOYEE_URL}/${employeeId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (!response.ok) return toast.error("operation failed");
    queryClient.setQueryData(["employees"], (prevData: any) => ({
      ...prevData,
      response: prevData.response.filter(
        (employee) => employee.id !== employeeId
      ),
    }));
  };
  return (
    <Table className="w-full  ">
      <TableHeader>
        <TableRow className="cursor-pointer hover:bg-zinc-800/70  border-b-2 border-b-white/15 ">
          <TableHead className="text-zinc-500 py-4">ID</TableHead>
          <TableHead className="text-zinc-500 py-4">Name</TableHead>
          <TableHead className="text-zinc-500 py-4">Salary</TableHead>
          <TableHead className="text-zinc-500 py-4">Department</TableHead>
          <TableHead className="text-zinc-500 py-4">Joining Date</TableHead>
          <TableHead className="text-zinc-500 py-4">Phone</TableHead>
          <TableHead className="text-right text-zinc-500 py-4">
            Option
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-8 text-zinc-400">
              Circle
            </TableCell>
          </TableRow>
        ) : null}
        {data?.response?.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-8 text-zinc-400">
              No Employee Found
            </TableCell>
          </TableRow>
        ) : (
          data?.response.map((employee) => (
            <TableRow key={employee.id} className="hover:bg-zinc-800/70">
              <TableCell>{employee.id}</TableCell>

              <TableCell>
                <div className="flex flex-col">
                  <span>{employee.username}</span>
                  <span className="text-zinc-600">{employee.email}</span>
                </div>
              </TableCell>

              <TableCell>{employee.salary}</TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell>{employee.joining_date}</TableCell>
              <TableCell>{employee.phone}</TableCell>

              <TableCell className="text-right">
                <Button
                  variant={"destructive"}
                  className="cursor-pointer"
                  onClick={() => handleDelete(employee.id)}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

export default EmployeeTable;
