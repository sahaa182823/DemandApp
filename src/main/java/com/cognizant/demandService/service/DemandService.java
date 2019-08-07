package com.cognizant.demandService.service;

import java.math.BigInteger;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.TreeSet;

import javax.persistence.Tuple;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.SystemPropertyUtils;
import org.springframework.web.bind.annotation.PathVariable;

import com.cognizant.demandService.pojo.Demand;
import com.cognizant.demandService.pojo.ResourceFulfillment;
import com.cognizant.demandService.pojo.StatusCount;
import com.cognizant.demandService.repository.DemandFulfillmentRepository;
import com.cognizant.demandService.repository.DemandRepository;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Service
public class DemandService {

	@Autowired
	private DemandRepository demandRepository;

	@Autowired
	private DemandFulfillmentRepository demandFulfillmentRepository;

	@SuppressWarnings("unused")
	@Transactional
	public boolean addDemand(Demand demand) {

		System.out.println(demand);
		return demandRepository.save(demand) != null;

	}

	@SuppressWarnings("unused")
	@Transactional
	public boolean updateDemand(Demand demand) {
		boolean saveFlag=false;
		System.out.println("CHECK HERE*****");
		System.out.println(demand);
		Set<ResourceFulfillment> rs = demand.getDemandFulfillment();
		for (ResourceFulfillment resourceFulfillment : rs) {
			saveFlag= demandFulfillmentRepository.save(resourceFulfillment) != null;
		}
		return saveFlag;
		

	}

	@Transactional
	public List<Demand> findByStatus(String status) {

		return demandRepository.findByStatusName(status);
	}

	@Transactional
	public List<Demand> findByDemand_no(String dno) {
		return demandRepository.findByDemand_no(dno);
	}

	@Transactional

	public List<Object[]> StatusCount() {

		return demandRepository.getStatusCount();

	}

	// @Transactional
	// public void updateResourceFulfillment(Demand demand) {
	// Set<ResourceFulfillment> objAssignedbean = demand.getDemandFulfillment();
	// System.out.println(objAssignedbean.size());
	// for (ResourceFulfillment rFulfillment : objAssignedbean) {
	// Demand demand1 = new Demand();
	// demand.setDemandID(demand.getDemandID());
	// rFulfillment.setDemand(demand1);
	// demandFulfillmentRepository.save(rFulfillment);
	// }
	// }
	//

	@Transactional
	public int changeStatusToCompleted(@Valid String demandNumber) {
		demandRepository.changeStatusToCompleted(demandNumber);

		return demandRepository.changeStatusToCompleted(demandNumber);
	}

	@Transactional
	public int deleteDemand(@Valid String demandNumber) {
		demandRepository.deleteDemand(demandNumber);

		return demandRepository.deleteDemand(demandNumber);
	}

	@Transactional
	public int changeStatusToOverdue(@Valid String demandNumber) {

		demandRepository.changeStatusToOverdue(demandNumber);

		return demandRepository.changeStatusToOverdue(demandNumber);

	}

	@Transactional
	public List<Object[]> getDistinctCountStatus() {
		return demandRepository.getDistinctCountStatus();

	}

	@Transactional
	public List<Object[]> OpenStatusCountByMonth(String status) {
		return demandRepository.getOpenStatusCountByMonth(status);

	}

	@Transactional
	public int changeStatusToCancelled(String demandNumber) {
		demandRepository.changeStatusToCancelled(demandNumber);

		return demandRepository.changeStatusToCancelled(demandNumber);
	}

	public List<Object> getOpenPositions() {

		return demandRepository.getOpenPositions();
	}

	public List<Object> getFulfilledPositions() {

		return demandRepository.getFulfilledPositions();
	}

	public List<Object> getBarGraphData() {

		return demandRepository.getBarGraphData();
	}

	public List<Object> getDistinctPortfolio(String status) {

		return demandRepository.getDistinctPortfolio(status);
	}

	public List<Object> getDistinctBillable() {

		return demandRepository.getDistinctBillable();
	}

	// -----------------------------------------

	public List<Object> getPortfolioCount() {
		System.out.println("Singh1");
		return demandRepository.getPortfolioCountData();
	}
	
	public List<Object> getDistinctPrincipalName(String status) {
		
		return demandRepository.getDistinctPrincipalName(status);
	}

	// public List<DashBoard>getPortfolioCountData() {
	//
	// System.out.println("controller1111");
	//
	// List<DashBoard> allStatus = new ArrayList<DashBoard>();
	//
	// for (Object[] statusCount
	// :demandRepository.getPortfolioCountDatawithMonth()) {
	// DashBoard db = new DashBoard();
	// BigInteger totalCount = (BigInteger) statusCount[0];
	// int totalCounts = totalCount.intValue();
	//
	// String status = (String) statusCount[1];
	// System.out.println("totalcount::" + totalCounts + "status::" + status);
	//
	// sc.setTotal(totalCounts);
	// sc.setStatus(status);
	// allStatus.add(sc);
	//
	// System.out.println("All status are: \n");
	// System.out.println(allStatus);
	//
	// }
	//
	// System.out.println("All status are: \n");
	// System.out.println(allStatus);
	// return allStatus;
	// //return demandRepository.getPortfolioCountDatawithMonth();
	// }
	//

}
