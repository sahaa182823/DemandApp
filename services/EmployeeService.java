package com.cognizant.assetservice.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cognizant.assetservice.pojo.Employee;
import com.cognizant.assetservice.repository.EmployeeRepository;

@Service
public class EmployeeService {
	
	@Autowired
    private EmployeeRepository employeeRepository;
	

	@Transactional
	public boolean addEmployee(Employee employee) {
		return employeeRepository.save(employee) != null;
	}


}
