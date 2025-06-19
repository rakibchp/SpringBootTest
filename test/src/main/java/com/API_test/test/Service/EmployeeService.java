package com.API_test.test.Service;

import com.API_test.test.Entity.Employee;
import com.API_test.test.Model.EmployeeModel;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface EmployeeService {
    
    EmployeeModel save(EmployeeModel employee);

    EmployeeModel findById(Long id);

    EmployeeModel deleteById(Long id);

    EmployeeModel update(Long id, EmployeeModel updatedEmployee);

    Page<Employee> getEmployeesPaginated(String keyword, int page, int size);

    List<EmployeeModel> findAll();

}
