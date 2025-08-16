import { useQuery } from "@tanstack/react-query";

function useFetchEmployeeQuery() {
  return useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });
}

const fetchEmployees = async () => {
  const response = await fetch(
    import.meta.env.VITE_BACKEND_FETCH_ALL_EMPLOYEES_URL,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const body = await response.json();
    throw new Error(body.error || "Request failed");
  }

  const data = await response.json();
  return data;
};

export { useFetchEmployeeQuery };
