import { ActivatedRoute, Router } from "@angular/router";
import { Employee } from "src/app/models/employee";
import { EmployeeService } from "src/app/services/employee.service";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employee: Employee = { name: '', company: '', designation: '' };
  editMode = false;

  constructor(
    private service: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.loadEmployee(+id);
    }
  }

  loadEmployee(id: number) {
    this.service.getById(id).subscribe(response => {
      this.employee = response.data;
    });
  }

  onSubmit() {
    if (this.editMode && this.employee.id) {
      this.service.update(this.employee.id, this.employee).subscribe(() => {
        this.router.navigate(['/employees']);
      });
    } else {
      this.service.create(this.employee).subscribe(() => {
        this.router.navigate(['/employees']);
      });
    }
  }
}
