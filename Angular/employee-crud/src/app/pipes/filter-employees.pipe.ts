import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../models/employee';


@Pipe({
  name: 'filterEmployees',
  standalone: true
})

export class FilterEmployeesPipe implements PipeTransform {
  transform(employees: Employee[], searchText: string): Employee[] {
    if (!employees || !searchText) {
      return employees;
    }

    const lower = searchText.toLowerCase();

    return employees.filter(emp =>
      emp.name.toLowerCase().includes(lower) ||
      emp.company.toLowerCase().includes(lower) ||
      emp.designation.toLowerCase().includes(lower)
      // emp.department.toLowerCase().includes(lower)
    );
  }
}
