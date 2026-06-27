using GSecobat.Application.Features.Employees.Responses;
using GSecobat.Domain.Entities;
using Riok.Mapperly.Abstractions;

namespace GSecobat.Application.Employees
{
    [Mapper(RequiredMappingStrategy = RequiredMappingStrategy.Source)]
    public static partial class EmployeeMapper
    {
        public static partial EmployeeResponse ToEmployeeResponse(this Employee source);
    }
}
