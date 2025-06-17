import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})



export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private service: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.service.getAll().subscribe(response => {
      return this.employees = response.data;
    });
  }

  deleteEmployee(id: number) {
    this.service.delete(id).subscribe(() => this.loadEmployees());
  }
}

