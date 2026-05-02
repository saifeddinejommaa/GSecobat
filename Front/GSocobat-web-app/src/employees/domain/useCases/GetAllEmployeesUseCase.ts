import { EmployeesRepository } from "../../data/repositories/EmployeesRepository";

export const GetEmployeesUseCase = async (
) => {
  const employees = await EmployeesRepository.getAll();

  return employees;
};