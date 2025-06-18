package com.API_test.test.Service;

import com.API_test.test.Entity.Employee;
import com.API_test.test.Model.EmployeeModel;
import com.API_test.test.Repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    EmployeeRepository employeeRepository;

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }


    public EmployeeModel deleteById(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        employeeRepository.deleteById(id);

        return new EmployeeModel(employee); // return DTO of deleted employee
    }


    @Override
    public EmployeeModel update(Long id, EmployeeModel updateModel) {
                 Employee employee = employeeRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Employee not found"));

                // Update fields
                employee.setName(updateModel.getName());
                employee.setCompany(updateModel.getCompany());
                employee.setDesignation(updateModel.getDesignation());

                // Save updated entity
                Employee savedEmployee = employeeRepository.save(employee);

                // Return converted model
                return new EmployeeModel(savedEmployee);
    }




    @Override
    public List<EmployeeModel> findAll() {
        return employeeRepository.findAll().stream().map(EmployeeModel::new).collect(Collectors.toList());
//        List<Employee> employees = employeeRepository.findAll();
//        List<EmployeeModel> employeeModels = new ArrayList<>();
//        for (Employee employee : employees) {
//            employeeModels.add(new EmployeeModel(employee));
//        }
//        return employeeModels;
    }

    @Override
    public EmployeeModel save(EmployeeModel employee) {
        Employee employee1 = new Employee(employee);
        employee1 = employeeRepository.save(employee1);
        return new EmployeeModel(employee1);
    }

    @Override
    public EmployeeModel findById(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with ID: " + id));
        return new EmployeeModel(employee);
    }

}
