import { createStore } from "zustand";

const employeeStore = createStore((set) => ({
  employee: [],
  setEmployee: (newEmployee) =>
    set((state) => ({
      employee: [...state.employee, newEmployee],
    })),
  clearEmployee: (employeeID) =>
    set((state) => ({
      employee: state.employee.filter((employee) => employeeID !== employee.id),
    })),
}));

export default employeeStore;
