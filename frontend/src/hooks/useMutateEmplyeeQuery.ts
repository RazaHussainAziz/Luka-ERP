import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useMutateEmployeeQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: mutateEmployees,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("creation successfull");
    },
    onError: () => {
      toast.error("failed to create employee");
    },
  });
};

type Employee = {
  username: string;
  email: string;
  password: string;
  salary: number;
  department: string;
  phone: string;
  joining_date: string;
};

async function mutateEmployees(newEmployee: Employee) {
  const response = await fetch(
    import.meta.env.VITE_BACKEND_INSERT_EMPLOYEE_URL,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmployee),
    }
  );
  console.log(response);
  if (!response.ok) {
    const body = await response.json();
    throw new Error(body.error || "Request failed");
  }

  const data = await response.json();

  return data;
}

export default useMutateEmployeeQuery;
