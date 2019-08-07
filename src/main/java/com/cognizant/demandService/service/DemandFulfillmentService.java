package com.cognizant.demandService.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cognizant.demandService.pojo.ResourceFulfillment;
import com.cognizant.demandService.repository.DemandFulfillmentRepository;

@Service
public class DemandFulfillmentService {
	
	@Autowired
	private DemandFulfillmentRepository demandFulfillmentRepository;
	
	
	
	
	@Transactional
	public void saveResource(ResourceFulfillment resourceFulfillment) {
		 demandFulfillmentRepository.save(resourceFulfillment);
	}




	public List<Object> getDistinctCapability(String status) {
		
		return demandFulfillmentRepository.getDistinctCapability(status);
	}




	public List<Object> getDistinctLocation(String status) {
		
		return demandFulfillmentRepository.getDistinctLocation(status);
	}
	
	public List<Object> getPositions(){
		
		return demandFulfillmentRepository.getPositions();
	}
	


//------------------------------------------------------
	
    public List<Object> getCount() {
        System.out.println("Singh");
        return demandFulfillmentRepository.getCountData();
 }

 public List<Object>getPracticeCount() {
        System.out.println("Singh1");
        return demandFulfillmentRepository.getPractceCountData();
 }
 

   public List<Object>getPortfolioCount() {
          System.out.println("Singh1");
          return demandFulfillmentRepository.getPortfolioCountData();
      



   }









}
