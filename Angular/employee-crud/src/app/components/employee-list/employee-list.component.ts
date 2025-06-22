import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterEmployeesPipe } from 'src/app/pipes/filter-employees.pipe';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FilterEmployeesPipe,
  ],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  searchText: string = '';

  currentPage: number = 0; // zero-based
  itemsPerPage: number = 5;
  totalItems: number = 0;
  totalPages: number = 0;

  pageSizeOptions = [5, 10, 25, 50];

  constructor(private service: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.service
      .getPaginatedEmployees(this.searchText || '', this.currentPage, this.itemsPerPage)
      .subscribe((res) => {
        this.employees = res.data.reverse();
        this.totalItems = res.totalItems;
        this.totalPages = res.totalPages;
      });
  }

  onSearch() {
    this.currentPage = 0;
    this.loadEmployees();
  }

  changePage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadEmployees();
    }
  }

  onPageSizeChange() {
    this.currentPage = 0;
    this.loadEmployees();
  }

  get showingFrom(): number {
    if (this.totalItems === 0) return 0;
    return this.currentPage * this.itemsPerPage + 1;
  }

  get showingTo(): number {
    return Math.min((this.currentPage + 1) * this.itemsPerPage, this.totalItems);
  }

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
      this.service.delete(id).subscribe({
        next: () => {
          // Swal.fire('Deleted!', 'Employee has been deleted.', 'success');
          this.loadEmployees();  // reload list after delete
        },
        error: (err) => {
          console.error('Delete error:', err);
          Swal.fire('Error', 'Failed to delete employee.', 'error');
        }
      });
    }
  });
}


  getDeptClass(department: string = ''): string {
    switch (department) {
      case 'HO-Finance':
        return 'text-success';
      case 'Release':
        return 'text-primary';
      case 'Micro Finance':
        return 'text-warning';
      case 'Procurement':
        return 'text-danger';
      default:
        return '';
    }
  }
}
