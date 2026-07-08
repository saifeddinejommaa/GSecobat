using GSecobat.Application.Common;
using GSecobat.Application.Features.Employees.Requests;
using GSecobat.Application.Features.Employees.Responses;

public interface IEmployeesQueryRepository
{
    public Task<PagedResult<EmployeeResponse>> GetAllEmployeesAsync(EmployeesRequestFilter filter);
}