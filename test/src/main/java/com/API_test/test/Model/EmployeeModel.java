package com.API_test.test.Model;

import com.API_test.test.Entity.Employee;
import lombok.*;

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

    public EmployeeModel(Employee employee) {
        this.setId(employee.getId());
        this.setName(employee.getName());
        this.setCompany(employee.getCompany());
        this.setDesignation(employee.getDesignation());
    }

    public EmployeeModel(String name, String company, String designation) {
        this.setName(name);
        this.setCompany(company);
        this.setDesignation(designation);
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
}
