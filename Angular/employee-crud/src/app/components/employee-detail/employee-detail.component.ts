// employee-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee';
import { FormBuilder, FormGroup } from '@angular/forms'; // Import FormBuilder and FormGroup
import { Router } from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})

export class EmployeeDetailComponent implements OnInit {
  employee!: Employee;
  employeeForm!: FormGroup;
  formChanged: boolean = false; 
  editMode = false;

  constructor(private route: ActivatedRoute, private service: EmployeeService, private formbuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.service.getById(id).subscribe(response => {
      this.employee = response.data;
    });

    const idFromDetailComp = this.route.snapshot.paramMap.get('id');
    if (idFromDetailComp) {
      this.editMode = true;
      this.loadEmployee(+idFromDetailComp);
    }

     this.employeeForm = this.formbuilder.group({
      name: [''],
      company: [''],
      designation: [''],
      department: ['']
    });

    // Track changes to the form
    this.employeeForm.valueChanges.subscribe(() => {
      this.formChanged = true;
    });
    
  }

  loadEmployee(id: number) {
    this.service.getById(id).subscribe(response => {
      this.employee = response.data;
      this.employeeForm.patchValue(this.employee); //  Patch the form with data
    });
  }


  saveDepartment() {
  const dept = this.employeeForm.get('department')?.value;
  if (dept && this.employee.id) {
    this.service.updateDepartment(this.employee.id, dept).subscribe(() => {
      Swal.fire('Success', 'Department updated successfully', 'success');
    });
  }
}


  
}
