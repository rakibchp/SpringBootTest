import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { EmployeeService } from "src/app/services/employee.service";
import { Employee } from "src/app/models/employee";
import { CapitalizePipe } from 'src/app/pipes/capitalize.pipe';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
  providers: [CapitalizePipe]
})
export class EmployeeFormComponent implements OnInit {
  employee: Employee = { name: '', company: '', designation: '' };
  employeeForm!: FormGroup;
  editMode = false;
  submitted = false;

  constructor(
    private service: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private capitalizePipe: CapitalizePipe
  ) {}

  capitalizeNameField(): void {
  const nameControl = this.employeeForm.get('name');
  const value = nameControl?.value || '';
  nameControl?.setValue(this.capitalizePipe.transform(value));
  }

  ngOnInit(): void {

  this.employeeForm = this.fb.group({
  name: ['', [Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]],
  company: ['', Validators.required],
  designation: ['', Validators.required],
  department: ['']
  });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.loadEmployee(+id);
    }
  }

  get name() {
    return this.employeeForm.get('name');
  }

  // Capitalize each word
 capitalizeName(name: string): string {
  return name.replace(/\b\w/g, char => char.toUpperCase());
}


  loadEmployee(id: number) {
    this.service.getById(id).subscribe(response => {
      this.employee = response.data;
      this.employeeForm.patchValue(this.employee); //  Patch the form with data
    });
  }

 formChanged = false;
    onInputChange() {
      this.formChanged = true;
    }

  onSubmit(): void {

      // onSubmit(form: NgForm) {
    this.submitted = true;
    // if (.invalid) {
    //   return; //  Stop if form is invalid
    // }
   
    if (this.employeeForm.invalid) return;

    const formData = this.employeeForm.value;

    if (this.editMode && this.employee.id) {
      this.service.update(this.employee.id, formData).subscribe(() => {
        this.router.navigate(['/employees']);
      });
    } else {
      this.service.create(formData).subscribe(() => {
        this.router.navigate(['/employees']);
      });
    }
  }


}
