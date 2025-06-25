package com.API_test.test.Entity;

import com.API_test.test.Model.EmployeeModel;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString

public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String company;
    private String designation;
    private String department;
    private int grade;
    private Double salary;
    @Column(name = "joining_date")
    private LocalDate joiningDate;


    public Employee(EmployeeModel employeeModel) {
        this.setId(employeeModel.getId());
        this.setName(employeeModel.getName());
        this.setCompany(employeeModel.getCompany());
        this.setDesignation(employeeModel.getDesignation());
        this.setDepartment(employeeModel.getDepartment());
    }

    public Employee (){}

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
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
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
