import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})

export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private service: EmployeeService, private router: Router, dialog: MatDialog,) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.service.getAll().subscribe(response => {
      const data = response.data ?? [];
      this.employees = data.sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
    });
  }

//   deleteEmployee(id: number) {
//   const confirmed = confirm('Are you sure you want to delete this employee?');
//   if (confirmed) {
//     this.service.delete(id).subscribe(() => this.loadEmployees());
//   }
// }


deleteEmployee(id: number) {
  Swal.fire({
    title: 'Employee Delete Action',
    text: "Are you sure you want to delete this employee?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      this.service.delete(id).subscribe(() => {
        this.loadEmployees();
        Swal.fire('Deleted!', 'Employee has been deleted.', 'success');
      });
    }
  });
}


}
