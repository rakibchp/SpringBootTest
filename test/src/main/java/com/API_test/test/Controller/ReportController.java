package com.API_test.test.Controller;


import com.API_test.test.Model.EmployeeModel;
import com.API_test.test.Service.EmployeeService;
import com.API_test.test.reportService.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @Autowired
    private EmployeeService employeeService; // Fetch employee data

    @GetMapping("/employee/pdf")
    public ResponseEntity<byte[]> generatePdf() {
        try {
            List<EmployeeModel> employees = employeeService.findAll(); // Your DB method

            byte[] pdf = reportService.exportEmployeeReport(employees);

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=employee-report.pdf")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdf);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

}
