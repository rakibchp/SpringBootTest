import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8080/api/v1/employee';

  constructor(private http: HttpClient) {}

getAll(): Observable<{ data: Employee[] }> {
  return this.http.get<{ data: Employee[] }>(`${this.apiUrl}/all`);
}

  getById(id: number): Observable<{ data: Employee }> {
    return this.http.get<{ data: Employee }>(`${this.apiUrl}/${id}`);
  }

  create(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/create`, employee);
  }

  update(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/update/${id}`, employee);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  updateDepartment(id: number, department: string) {
  const payload = { department };
  return this.http.patch(`http://localhost:8080/api/v1/employee/update-department/${id}`, payload);
}

getPaginatedEmployees(keyword: string = '', page: number = 0, size: number =5): Observable<any> {
  const params = {
    keyword: keyword?? '', // Ensure keyword is not null
    page: page.toString(),
    size: size.toString()
  };
  return this.http.get<any>(`${this.apiUrl}/list`, { params });
}

getDepartments(page: number = 0, size: number = 10): Observable<string[]> {
  return this.http.get<string[]>(`${this.apiUrl}/departments?page=${page}&size=${size}`);
}




  
}
