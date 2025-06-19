import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { FilterEmployeesPipe } from 'src/app/pipes/filter-employees.pipe'; // adjust path if needed
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    RouterModule,
    FilterEmployeesPipe
  ],
})

export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  searchText: string = '';

  filteredEmployees: Employee[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  totalPages: number = 0;

  get pagedEmployees(): Employee[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredEmployees.slice(start, end);
  }

  // get totalPages(): number {
  //   return Math.ceil(this.filteredEmployees.length / this.itemsPerPage);
  // }


  changePage(page: number): void {
  if (page >= 0 && page < this.totalPages) {
    this.currentPage = page;
    this.loadEmployees();
  }
}

    applyFilter(): void {
    const search = this.searchText.toLowerCase();
    this.filteredEmployees = this.employees.filter(emp =>
      emp.name.toLowerCase().includes(search) ||
      emp.company.toLowerCase().includes(search) ||
      emp.designation.toLowerCase().includes(search)
    );
    this.currentPage = 1;
  }

  onSearch(): void {
  this.currentPage = 0;
  this.loadEmployees();
}

  get totalEmployees(): number {
  return this.employees.length;
  }

  get filteredCount(): number {
  return this.filteredEmployees.length;
  }

  get showingFrom(): number {
  return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get showingTo(): number {
  return Math.min(this.currentPage * this.itemsPerPage, this.filteredCount);
  }

  goToWelcomePage() {
    this.router.navigate(['/welcome']);
  }
  constructor(private service: EmployeeService, private router: Router, private dialog: MatDialog,) {}

  ngOnInit(): void {
  // this.searchText = ''; //  Initialize as empty string
  // this.currentPage = 0;
  this.loadEmployees(); //  Ensure this is called
}

    // this.service.getAll().subscribe(response => {
    //   const data = response.data ?? [];
    //   this.employees = data.sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
    //   this.filteredEmployees = this.employees;
    // });

  loadEmployees() {  
  this.service.getPaginatedEmployees(this.searchText || '', this.currentPage, this.itemsPerPage)
    .subscribe(res => {
      this.employees = res.data.reverse();
      this.totalItems = res.totalItems;
      this.totalPages = res.totalPages;
    });
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
      this.service.delete(id).subscribe(() => {
        this.loadEmployees();
        Swal.fire('Deleted!', 'Employee has been deleted.', 'success');
      });
    }
  });
}

getDeptClass(department: string =''): string {
  switch (department) {
    case 'HO-Finance': return 'text-success';
    case 'Release': return 'text-primary';
    case 'Software Quality Assurance': return 'text-warning';
    case 'HRMS': return 'text-danger';
    default: return '';
  }
}



}
