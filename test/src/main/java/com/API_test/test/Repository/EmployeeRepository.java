package com.API_test.test.Repository;

import com.API_test.test.Entity.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Page<Employee> findAllByOrderByIdDesc(Pageable pageable);

    @Query("SELECT e FROM Employee e WHERE " +
            "LOWER(e.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(e.company) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(e.designation) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(e.department) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "ORDER BY e.id DESC")
    Page<Employee> search(@Param("keyword") String keyword, Pageable pageable);


}
