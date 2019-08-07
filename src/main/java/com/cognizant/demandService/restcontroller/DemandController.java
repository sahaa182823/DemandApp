package com.cognizant.demandService.restcontroller;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.demandService.pojo.DashBoard;
import com.cognizant.demandService.pojo.Demand;
import com.cognizant.demandService.pojo.Message;
import com.cognizant.demandService.pojo.ResourceFulfillment;
import com.cognizant.demandService.pojo.StatusCount;
import com.cognizant.demandService.repository.DemandFulfillmentRepository;
import com.cognizant.demandService.repository.DemandRepository;
import com.cognizant.demandService.service.DemandFulfillmentService;
import com.cognizant.demandService.service.DemandService;

@RestController
@CrossOrigin(origins = "*")
public class DemandController {

	@Autowired
	private DemandService demandService;

	@Autowired
	private DemandFulfillmentService demandFulfillmentService;

	@Autowired
	private DemandRepository demandRepository;

	@Autowired
	private DemandFulfillmentRepository demandFulfillmentRepository;

	@RequestMapping(value = "/saveDemand", method = RequestMethod.POST)
	@ResponseBody
	public Message insertEmployee(@RequestBody Demand demand) {

		boolean isSave = demandService.addDemand(linkChild(demand));
		if (isSave)
			return new Message("SUCCESS DEMAND", "NA");

		return new Message("FAIL DEMAND", null);
	}

	private Demand linkChild(Demand demand) {
		if (demand.getDemandFulfillment().size() > 0) {

			demand.getDemandFulfillment().stream().forEach(demandFulfillment -> {
				demandFulfillment.setDemand(demand);
				;
			});
			Set<ResourceFulfillment> rs = demand.getDemandFulfillment();
			Set<ResourceFulfillment> rsforSave = new LinkedHashSet<>();

			for (ResourceFulfillment resourceFulfillment : rs) {
				Integer count = resourceFulfillment.getCount();
				ResourceFulfillment saveRf = null;
				for (int i = 0; i < count; i++) {
					saveRf = new ResourceFulfillment();
					saveRf.setAddComments(resourceFulfillment.getAddComments());
					saveRf.setSkill(resourceFulfillment.getSkill());
					saveRf.setDemandNumber(resourceFulfillment.getDemandNumber());
					saveRf.setCapability(resourceFulfillment.getCapability());
					saveRf.setLocation(resourceFulfillment.getLocation());
					saveRf.setResource_level(resourceFulfillment.getResource_level());
					saveRf.setDescription(resourceFulfillment.getDescription());
					saveRf.setDemand(demand);
					rsforSave.add(saveRf);
					System.out.println(saveRf);
				}
				demand.setDemandFulfillment(rsforSave);

			}

		}
		return demand;
	}

	@RequestMapping(value = "/updateResources", method = RequestMethod.PATCH)
	@ResponseBody
	public void insertEmployee1(@RequestBody Demand demand) {

		boolean isSave = demandService.updateDemand(linkChildOnUpdate(demand));
		// saveDemand();
		// if (isSave)
		// return new Message("SUCCESS DEMAND", "NA");
		//
		// return new Message("FAIL DEMAND", null);
	}

	// private Demand linkChild1(Demand demand) {
	// if(demand.getDemandFulfillment() != null){
	//
	// }
	// if (demand.getDemandFulfillment().size() > 0) {
	// demand.getDemandFulfillment().stream().forEach(demandFulfillment -> {
	// demandFulfillment.setDemand(demand);
	// ;
	// });
	// }
	// return demand;
	// }
	//
	private Demand linkChildOnUpdate(Demand demand) {
		if (demand.getDemandFulfillment().size() > 0) {

			demand.getDemandFulfillment().stream().forEach(demandFulfillment -> {
				demandFulfillment.setDemand(demand);
				;
			});

		}

		return demand;
	}

	@GetMapping("/retriveDemands")
	public List<Demand> retrieveAllDemands() {
		System.out.println("Request Come to COntroller ");
		// return demandRepository.getAllData();
		return demandRepository.findAll();
	}

	@GetMapping("/retriveDemandsById/{id}")
	public Optional<Demand> retrieveDemandById(@PathVariable int id) {
		// Optional<Demand> demand = demandRepository.findById(id);
		return demandRepository.findById(id);
	}

	@PutMapping("/updateDemand/{Id}")
	public void updateDemands(@Valid @RequestBody Demand demand) {
		demandRepository.save(demand);
	}

	@GetMapping("/retriveDemandsByStatus/{status}")
	public List<Demand> retriveDemandsByStatus(@PathVariable String status) {

		return demandService.findByStatus(status);
	}

	@GetMapping("/retriveDemandsByDemandNumber/{dno}")
	public List<Demand> retriveDemandsByDemandNumber(@PathVariable String dno) {

		return demandService.findByDemand_no(dno);
	}

	@GetMapping("/getResourceFulfillment")
	public List<ResourceFulfillment> getResourceFulfillment() {
		return demandFulfillmentRepository.findAll();
	}

	@GetMapping("/getOpenPositions")
	public List<Object> getOpenPositions() {
		return demandService.getOpenPositions();
	}

	@GetMapping("/getFulfilledPositions")
	public List<Object> getFulfilledPositions() {
		return demandService.getFulfilledPositions();
	}

	@RequestMapping(value = "/saveResources", method = RequestMethod.POST)
	@ResponseBody
	public Message insertResources(@RequestBody ResourceFulfillment[] resourceFulfillment) {
		// System.out.println(demand.getDemandID());

		for (int i = 0; i < resourceFulfillment.length; i++) {
			demandFulfillmentRepository.save(resourceFulfillment[i]);
		}

		return null;

	}
	
	

	@GetMapping("/getStatusCount")
	public List<StatusCount> getStatusCount() {
		System.out.println("controller");

		List<StatusCount> allStatus = new ArrayList<StatusCount>();

		for (Object[] statusCount : demandRepository.getStatusCount()) {
			StatusCount sc = new StatusCount();
			BigInteger totalCount = (BigInteger) statusCount[0];
			int totalCounts = totalCount.intValue();

			String status = (String) statusCount[1];
			System.out.println("totalcount::" + totalCounts + "status::" + status);

			sc.setTotal(totalCounts);
			sc.setStatus(status);
			allStatus.add(sc);

			System.out.println("All status are: \n");
			System.out.println(allStatus);

		}

		System.out.println("All status are: \n");
		System.out.println(allStatus);
		return allStatus;
	}

	// // @PutMapping("/saveResourceDetails")
	// @PutMapping("/updateDemandFulfillmentTable/{demandNumber}")
	// public void updateResources(@Valid @RequestBody Demand objAssignedbean){
	//// System.out.println("size:"+objAssignedbean.getDemandFulfillment.length);
	// System.out.println("SEE HERE==>"+ objAssignedbean);
	// demandService.updateResourceFulfillment(objAssignedbean);
	//
	// }

	@PutMapping("/changeStatusToCompleted/{demandNumber}")
	public int changeStatusToCompleted(@PathVariable(value = "demandNumber") String demandNumber) {

		return demandService.changeStatusToCompleted(demandNumber);

	}

	@PutMapping("/changeStatusToCancelled/{demandNumber}")
	public int changeStatusToCancelled(@PathVariable(value = "demandNumber") String demandNumber) {

		return demandService.changeStatusToCancelled(demandNumber);

	}

	@PutMapping("/changeStatusToOverdue/{demandNumber}")
	public int changeStatusToOverdue(@PathVariable(value = "demandNumber") String demandNumber) {

		return demandService.changeStatusToOverdue(demandNumber);

	}

	@PutMapping("/deleteDemand/{demandNumber}")
	public int deleteDemand(@PathVariable(value = "demandNumber") String demandNumber) {

		return demandService.deleteDemand(demandNumber);

	}

	@GetMapping("/getOpenStatusCountByMonth")
	public List<Object[]> getAvailableAssetCount() {
		List<Object[]> ListOfAllStatus = new ArrayList<Object[]>();
		List<Object[]> dList = demandService.getDistinctCountStatus();
		for (Object[] listOfStatus : dList) {
			Demand demand = new Demand();
			System.out.println("status:" + listOfStatus[0]);
			String status = listOfStatus[0].toString();
			List<Object[]> obList = demandService.OpenStatusCountByMonth(status);
			ListOfAllStatus.addAll(obList);
		}
		return ListOfAllStatus;
	}

	@GetMapping("/getBarGraphData")
	public List<Object> getBarGraphData() {
		return demandService.getBarGraphData();
	}

	@GetMapping("/getDistinctCapability/{status}")
	public List<Object> getDistinctCapability(@PathVariable(value = "status") String status) {
		return demandFulfillmentService.getDistinctCapability(status);
	}

	@GetMapping("/getDistinctPortfolio/{status}")
	public List<Object> getDistinctPortfolio(@PathVariable(value = "status") String status) {
		return demandService.getDistinctPortfolio(status);
	}

	@GetMapping("/getDistinctBillable")
	public List<Object> getDistinctBillable() {
		return demandService.getDistinctBillable();
	}

	@GetMapping("/getDistinctLocation/{status}")
	public List<Object> getDistinctLocation(@PathVariable(value = "status") String status) {
		return demandFulfillmentService.getDistinctLocation(status);
	}
	
	@GetMapping("/getPositions")
	public List<Object> getPositions(){
		
		return demandFulfillmentService.getPositions();
	}
	
	@GetMapping("/getDistinctPrincipalName/{status}")
	public List<Object> getDistinctPrincipalName(@PathVariable(value = "status") String status) {
		return demandService.getDistinctPrincipalName(status);
	}

	// ------------------------------------------------------------

	@GetMapping("/assignedAssetCount")
	public List<Object> getAssignedAssetCount() {
		System.out.println("Shiavm");
		return demandFulfillmentService.getCount();
	}

	@GetMapping("/practiceCount")
	public List<Object> getpracticeCountData() {
		System.out.println("Shiavm1");
		return demandFulfillmentService.getPracticeCount();
	}

	@GetMapping("/portfolioCountwithMonthData")
	public List<DashBoard> getStatusCountfromResourceFullFillmentTable() {
		System.out.println("controller1111");

		List<DashBoard> allStatus = new ArrayList<DashBoard>();

		for (Object[] statusCount : demandRepository.getPortfolioCountDatawithMonth()) {
			DashBoard db = new DashBoard();
			BigInteger totalCount = (BigInteger) statusCount[4];
			int totalCounts = totalCount.intValue();

			String principle_name = (String) statusCount[0];
			String portfolio = (String) statusCount[1];
			String skill = (String) statusCount[2];
			String month = (String) statusCount[3];

			System.out.println("totalcount::" + totalCounts + "status::" + principle_name);

			// sc.setTotal(totalCounts);
			// sc.setStatus(status);
			db.setCountData(totalCounts);
			db.setPrinciple_name(principle_name);
			db.setMonth(month);
			db.setPortfolio(portfolio);
			db.setSkill(skill);
			allStatus.add(db);

			System.out.println("All status are: \n");
			System.out.println(allStatus);

		}

		System.out.println("All status are: \n");
		System.out.println(allStatus);
		return allStatus;
	}

	@GetMapping("/portfolioCount")
	public List<Object> getPortfoliocountData() {
		System.out.println("Shiavm1");
		return demandService.getPortfolioCount();

	}

	@GetMapping("/getStatusCountfromResourceTable")
	public List<StatusCount> getPortfoliocountDatawithDate() {
		System.out.println("controller1111");

		List<StatusCount> allStatus = new ArrayList<StatusCount>();

		for (Object[] statusCount : demandFulfillmentRepository.getStatusCountData()) {
			StatusCount sc = new StatusCount();
			BigInteger totalCount = (BigInteger) statusCount[0];
			int totalCounts = totalCount.intValue();

			String status = (String) statusCount[1];
			System.out.println("totalcount::" + totalCounts + "status::" + status);
			sc.setTotal(totalCounts);
			sc.setStatus(status);
			allStatus.add(sc);

			System.out.println("All status are: \n");
			System.out.println(allStatus);

		}

		System.out.println("All status are: \n");
		System.out.println(allStatus);
		return allStatus;

	}

}
