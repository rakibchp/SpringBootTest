package com.API_test.test.Controller;

import com.API_test.test.Model.ApiResponse;
import com.API_test.test.Model.EmployeeModel;
import com.API_test.test.Service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Locale;


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

}
