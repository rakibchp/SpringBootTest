import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent }, //  default route
  // { path: '', redirectTo: 'employees', pathMatch: 'full' },
  // { path: 'employees/edit/:id', component: EmployeeFormComponent },

  { path: 'employees', component: EmployeeListComponent },
  { path: 'employees/new', component: EmployeeFormComponent },
  { path: 'employees/edit/:id', component: EmployeeFormComponent },
  {
  path: 'employees/details/:id',
  component: EmployeeDetailComponent
}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
