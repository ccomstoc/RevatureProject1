package com.revature.Project1Backend.Services;


import com.revature.Project1Backend.DAOs.EmployeeDAO;
import com.revature.Project1Backend.DAOs.ReimbursementDAO;
import com.revature.Project1Backend.Models.Employee;
import com.revature.Project1Backend.Models.Reimbursement;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    protected static final Logger log = LoggerFactory.getLogger(EmployeeService.class);
    private EmployeeDAO eDAO;
    private ReimbursementDAO rDAO;

    @Autowired
    public EmployeeService(EmployeeDAO eDAO, ReimbursementDAO rDAO){

        this.eDAO = eDAO;
        this.rDAO = rDAO;
        log.info("EmployeeService Initialized");

    }

    public List<Employee> getAllUsers(){
        log.info("getAllUsers called");
        List<Employee> sortedEmps = eDAO.findAll();
        Collections.sort(sortedEmps);
        return sortedEmps;

    }
    public Employee getEmployeeById(int id){
        log.info("getEmployeeById called with id=" + id);
        Optional<Employee> optionalEmp = eDAO.findById(id);
        if(optionalEmp.isPresent())
            return optionalEmp.get();
        else
            return null;

    }

    public Employee createEmployee(Employee emp){
        log.info("createEmployee called with employee=" + emp.toString());
        return eDAO.save(emp);
    }

    public void deleteEmployee(int id){
        log.info("deleteEmployee called with id=" + id);
        List<Reimbursement> rList = rDAO.findByEmployeeEmployeeId(id);
        rDAO.deleteAllInBatch(rList);
        eDAO.deleteById(id);
    }

    public Employee updateEmployee(Employee emp,String field){
        log.info("updateEmployee called with field=" + field + "Employee= " + emp.toString());
        Employee fullEmp = getEmployeeById(emp.getEmployeeId());

        //Switch for implementation of further updates
        switch(field){
            case "role": fullEmp.setRole(emp.getRole());
                break;

        }

        return eDAO.save(fullEmp);
    }

}
