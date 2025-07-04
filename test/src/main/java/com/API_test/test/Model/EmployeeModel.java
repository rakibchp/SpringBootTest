package com.API_test.test.Model;

import com.API_test.test.Entity.Employee;
import lombok.*;

import javax.persistence.Column;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class EmployeeModel {

    private Long id;
    private String name;
    private String company;
    private String designation;
    private String department;
    private int grade;
    private Double salary;
    @Column(name = "joining_date")
    private LocalDate joiningDate;


    public EmployeeModel(Employee employee) {
        this.setId(employee.getId());
        this.setName(employee.getName());
        this.setCompany(employee.getCompany());
        this.setDesignation(employee.getDesignation());
        this.setDepartment(employee.getDepartment());
    }

    public EmployeeModel(String name, String company, String designation, String department) {
        this.setName(name);
        this.setCompany(company);
        this.setDesignation(designation);
        this.setDesignation(designation);
        this.setDepartment(department);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getDepartment() {
        if (this.department != null) {
            return this.department;
        }
        return department; // or return null; depending on your logic
    }


    public void setDepartment(String department) {
        this.department = department;
    }

    public boolean isPresent() {
        return true;
    }

    public EmployeeModel get() {
        return null;
    }

    public int getGrade() {
        return grade;
    }

    public void setGrade(int grade) {
        this.grade = grade;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }


    public LocalDate getJoiningDate() {
        return joiningDate;
    }

    public void setJoiningDate(LocalDate joiningDate) {
        this.joiningDate = joiningDate;
    }



}
