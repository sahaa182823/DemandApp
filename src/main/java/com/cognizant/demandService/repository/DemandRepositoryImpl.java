package com.cognizant.demandService.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import com.cognizant.demandService.pojo.Demand;

@Repository
@Transactional
public class DemandRepositoryImpl implements DemandRepositoryCustom {
	
	 @PersistenceContext
	    EntityManager entityManager;

//	    @Override
//	    public List<Demand> getFirstNamesLikeAndBonusBigger(String firstName, Double bonusAmount) {
//	        Query query = entityManager.createNativeQuery("select e.* from spring_data_jpa_example.bonus b, spring_data_jpa_example.employee e\n" +
//	                "where e.id = b.employee_id " +
//	                "and e.firstname LIKE ? " +
//	                "and b.amount> ? ", Employee.class);
//	        query.setParameter(1, firstName + "%");
//	        query.setParameter(2, bonusAmount);
//
//	        return query.getResultList();
//	    }

		@Override
		public List<Demand> findByStatusName(String status) {
			 Query query = entityManager.createNativeQuery("select d.* from DEMAND_TABLE d " +
					    "WHERE d.status= ?", Demand.class);
			 
			 query.setParameter(1, status);
		        
		        List<Demand> demandList = query.getResultList();
				 for (Demand demand : demandList) {
					 demand.setDemandFulfillment(null);
				}
				 
				 
				
				return demandList;

		}
	    
	    

}
