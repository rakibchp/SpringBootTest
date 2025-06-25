package com.API_test.test.reportService;

import com.API_test.test.Model.EmployeeModel;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.HashMap;
import java.util.List;

@Service
public class ReportService {

    public byte[] exportEmployeeReport(List<EmployeeModel> employees) throws Exception {
        // Load JRXML file
        InputStream reportStream = getClass().getResourceAsStream("/reports/EmployeeReport1.jrxml");
        JasperReport jasperReport = JasperCompileManager.compileReport(reportStream);

        // Data source
        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(employees);

        // Parameters (if any)
        HashMap<String, Object> params = new HashMap<>();

        // Fill the report
        JasperPrint print = JasperFillManager.fillReport(jasperReport, params, dataSource);

        // Export to PDF
        return JasperExportManager.exportReportToPdf(print);
    }

}
