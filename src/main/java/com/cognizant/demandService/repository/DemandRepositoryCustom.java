package com.cognizant.demandService.repository;

import java.util.List;

import com.cognizant.demandService.pojo.Demand;

public interface DemandRepositoryCustom {
	
	 List<Demand> findByStatusName(String status);

}
