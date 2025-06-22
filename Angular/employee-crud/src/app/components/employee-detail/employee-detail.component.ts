import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
declare var bootstrap: any;


@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css'],
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})

export class EmployeeDetailComponent implements OnInit {
  employeeForm!: FormGroup;
  employee!: Employee;
  formChanged: boolean = false;

  departments: string[] = [
    'Release', 'Procurement', 'Infrastructure', 'Sales & Marketing', 'Micro Finance', 'HO-Finance',
    'Software Quality Assurance', 'Human Resource Management', 'Bkash', 'Brac Bank', 'BRAC',
    'Frontend Engineering', 'Backend Engineering', 'Full-Stack Engineering', 'DevOps/SRE',
    'QA/Test Engineering', 'Data Engineering', 'Machine Learning', 'Security Engineering',
    'Mobile Engineering', 'Product Management', 'UX/UI Design', 'Technical Writing', 'Marketing', 'Team Lead',
    'Technical Lead', 'Delivery Co-ordination', 'Project Management', 'Line Manager', 'Supervisor'
  ];

  searchControl = new FormControl('');
  filteredDepartments$!: Observable<string[]>;

  constructor(
    private route: ActivatedRoute,
    private service: EmployeeService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      name: [''],
      company: [''],
      designation: [''],
      department: ['']
    });

    this.employeeForm.valueChanges.subscribe(() => {
      this.formChanged = true;
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.service.getById(id).subscribe(res => {
        this.employee = res.data;
        this.employeeForm.patchValue(this.employee);
      });
    }

    this.filteredDepartments$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(search => {
        const term = search?.toLowerCase() || '';
        return this.departments.filter(d => d.toLowerCase().includes(term));
      })
    );
  }

  openDepartmentModal() {
    // this.searchControl.setValue(this.employeeForm.get('department')?.value || '');
    this.searchControl.setValue('');
  }

  selectDepartment(dept: string) {
    this.employeeForm.get('department')?.setValue(dept);
    const modal = document.getElementById('departmentModal');
    const modalInstance = bootstrap.Modal.getInstance(modal!);
    modalInstance?.hide();
  }

  // saveDepartment() {
  //   const dept = this.employeeForm.get('department')?.value;
  //   if (dept && this.employee.id) {
  //     this.service.updateDepartment(this.employee.id, dept).subscribe(() => {
  //       Swal.fire('Success', 'Department updated successfully', 'success');
  //     });
  //   }
  // }

  saveDepartment() {
  const dept = this.employeeForm.get('department')?.value;
  if (dept && this.employee.id) {
    this.service.updateDepartment(this.employee.id, dept).subscribe(() => {
      // Close the modal immediately
      const modal = document.getElementById('departmentModal');
      const modalInstance = bootstrap.Modal.getInstance(modal!);
      modalInstance?.hide();

      // Optional: very quick feedback with no button (disappears in 800ms)
      Swal.fire({
        icon: 'success',
        title: 'Saved!',
        showConfirmButton: false,
        timer: 500,
        timerProgressBar: true
      });
    });
  }
}


  goBack() {
    this.router.navigate(['/employees']);
  }
}

