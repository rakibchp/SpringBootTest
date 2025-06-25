package com.API_test.test.Controller;

import com.API_test.test.Entity.Employee;
import com.API_test.test.apiModel.ApiResponse;
import com.API_test.test.Model.EmployeeModel;
import com.API_test.test.Service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/employee")
public class EmployeeController {
    @Autowired
    MessageSource messageSource;

    @Autowired
    private EmployeeService employeeService;

// creating new employee
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseEntity<Object> create(@RequestBody EmployeeModel employee) {
        ApiResponse response = new ApiResponse(false);
        try {
            response.setData(employeeService.save(employee));
            response.setMessage(messageSource.getMessage("api.create.success", null, Locale.ENGLISH));
            response.setSuccess(true);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            response.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // create department
    @RequestMapping(value = "/update-department/{id}", method = RequestMethod.PATCH)
    public ResponseEntity<Object> updateDepartment(@PathVariable Long id, @RequestBody Map<String, Object> requestBody) {
        ApiResponse response = new ApiResponse(false);

        try {
            String department = requestBody.get("department").toString();

            EmployeeModel employee = employeeService.findById(id);
            if (employee == null) {
                response.setMessage("Employee not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            employee.setDepartment(department);
            response.setData(employeeService.save(employee));
            response.setMessage(messageSource.getMessage("api.update.success", null, Locale.ENGLISH));
            response.setSuccess(true);
            return ResponseEntity.status(HttpStatus.OK).body(response);

        } catch (Exception e) {
            response.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // get employee by id
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> getById(@PathVariable Long id) {
        ApiResponse response = new ApiResponse(false);
        try {
            EmployeeModel employee = employeeService.findById(id);
            response.setData(employee);
            response.setMessage(messageSource.getMessage("api.details.success", null, Locale.ENGLISH));
            response.setSuccess(true);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            response.setMessage(e.getMessage());
            response.setSuccess(false);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    // get all employee
    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public ResponseEntity<Object> getAllEmployees() {
        ApiResponse response = new ApiResponse(false);
        try {
            List<EmployeeModel> employeeList = employeeService.findAll();
            response.setData(employeeList);
            response.setMessage(messageSource.getMessage("api.list.success", null, Locale.ENGLISH));
            response.setSuccess(true);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            response.setMessage(e.getMessage());
            response.setSuccess(false);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // update existing employee
    @RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Object> update(@PathVariable Long id, @RequestBody EmployeeModel updatedEmployee) {
        ApiResponse response = new ApiResponse(false);
        try {
            EmployeeModel employee = employeeService.update(id, updatedEmployee);
            response.setData(employee);
            response.setMessage(messageSource.getMessage("api.update.success", null, Locale.ENGLISH));
            response.setSuccess(true);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            response.setMessage(e.getMessage());
            response.setSuccess(false);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // delete employee by specific id
    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> delete(@PathVariable Long id) {
        ApiResponse response = new ApiResponse(false);
        try {
            EmployeeModel deletedEmployee = employeeService.deleteById(id); // fetch + delete
            response.setData(deletedEmployee); // show deleted data
            response.setMessage(messageSource.getMessage("api.delete.success", null, Locale.ENGLISH));
            response.setSuccess(true);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            response.setMessage(e.getMessage());
            response.setSuccess(false);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // Create Controller Endpoint
    @GetMapping("/list")
    public ResponseEntity<Object> getPaginatedEmployees(
            @RequestParam(defaultValue = "") String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        Page<Employee> employeePage = employeeService.getEmployeesPaginated(keyword, page, size);

        Map<String, Object> response = new HashMap<>();
        response.put("data", employeePage.getContent());
        response.put("currentPage", employeePage.getNumber());
        response.put("totalItems", employeePage.getTotalElements());
        response.put("totalPages", employeePage.getTotalPages());

        return ResponseEntity.ok(response);
    }

}
